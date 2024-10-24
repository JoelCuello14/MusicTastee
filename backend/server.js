const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//Parametros para conectar a la BD
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'musictaste'
});

//Cone a la bd
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// CREATE - Ruta para crear un usuario (POST)
app.post('/api/usuarios', async (req, res) => {
    const { nombre, password, email } = req.body;

    // Validar que los datos estén presentes
    if (!nombre || !password || !email) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario en la base de datos
        const query = 'INSERT INTO usuarios (nombre, password, email) VALUES (?, ?, ?)';
        db.query(query, [nombre, hashedPassword, email], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    // Manejar error de entrada duplicada
                    return res.status(409).json({ message: 'El correo ya está registrado' });
                }
                // Otros errores
                return res.status(500).json({ message: 'Error al crear el usuario', error: err });
            }

            console.log('Usuario creado:', { id: result.insertId, nombre: nombre, email: email });
            res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
        });
    } catch (error) {
        console.error('Error en la creación del usuario:', error);
        res.status(500).json({ message: 'Error en la creación del usuario' });
    }
});


// UPDATE - Ruta para editar un usuario por su ID (PUT)
app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, password } = req.body;

    // Validar que los datos estén presentes
    if (!nombre || !password) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar el usuario en la base de datos
        const query = 'UPDATE usuario SET nombre = ?, password = ? WHERE id = ?';
        db.query(query, [nombre, hashedPassword, id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error al actualizar el usuario', error: err });
            }
            res.json({ message: 'Usuario actualizado' });
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});

// DELETE - Ruta para eliminar un usuario por su ID (DELETE)
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM usuario WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al eliminar el usuario', error: err });
        }
        res.json({ message: 'Usuario eliminado' });
    });
});

app.get('/api/canciones', (req, res) => {
    const sql = 'SELECT * FROM canciones';  // Asegúrate que la tabla se llama "canciones"
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener las canciones');
        return;
      }
      res.json(result);
    });
  });
  // Ruta para crear una nueva playlist (POST)
app.post('/api/playlists', (req, res) => {
    const { userId, name } = req.body;

    if (!userId || !name) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const query = 'INSERT INTO playlists (user_id, name) VALUES (?, ?)';
    db.query(query, [userId, name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al crear la playlist', error: err });
        }
        res.status(201).json({ message: 'Playlist creada', playlistId: result.insertId });
    });
});

// Ruta para obtener las playlists de un usuario (GET)
app.get('/api/playlists/:userId', (req, res) => {
    const { userId } = req.params;

    const query = 'SELECT * FROM playlists WHERE user_id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener las playlists', error: err });
        }
        res.json(result);
    });
});

// Ruta para agregar canciones a una playlist (POST)
app.post('/api/playlists/:playlistId/canciones', (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const query = 'INSERT INTO playlist_canciones (playlist_id, song_id) VALUES (?, ?)';
    db.query(query, [playlistId, songId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al agregar la canción a la playlist', error: err });
        }
        res.status(201).json({ message: 'Canción agregada a la playlist' });
    });
});

  
app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});