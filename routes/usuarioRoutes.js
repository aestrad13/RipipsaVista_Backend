const express = require('express');
const router = express.Router();
const { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, autenticarUsuario } = require('../db/dbUsuario');

router.get('/', async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id);
        const usuario = await obtenerUsuarioPorId(usuarioId);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el usuario: ' + error.message);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await autenticarUsuario(username, password);

        if (usuario) {
            res.status(200).json({ success: true, user: usuario });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).json({ success: false, message: 'Error al autenticar el usuario' });
    }
});


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUserID = await crearUsuario(username, password);

        res.status(201).json({ success: true, newUserID });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ success: false, message: 'Error al crear el usuario' });
    }
});



router.put('/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id);
        const nombre = req.body.nombre;
        await actualizarUsuario(usuarioId, nombre);
        res.send('Usuario actualizado correctamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id);
        await eliminarUsuario(usuarioId);
        res.send('Usuario eliminado correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
});

module.exports = router;