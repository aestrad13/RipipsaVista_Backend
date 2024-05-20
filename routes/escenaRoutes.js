const express = require('express');
const router = express.Router();
const { obtenerEscenas, obtenerEscenaPorId, createEscena, actualizarEscena, eliminarEscena, obtenerEscenasPorUsuarioId} = require('../db/dbEscena');

router.get('/', async (req, res) => {
    try {
        const escenas = await obtenerEscenas();
        res.json(escenas);
    } catch (error) {
        res.status(500).send('Error al obtener las escenas');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const escenaId = parseInt(req.params.id);
        const escena = await obtenerEscenaPorId(escenaId);
        if (escena) {
            res.json(escena);
        } else {
            res.status(404).send('Escena no encontrada');
        }
    } catch (error) {
        res.status(500).send('Error al obtener la escena');
    }
});

router.post('/', async (req, res) => {
    const { usuario_id, descripcion } = req.body;

    try {
        const newEscenaID = await createEscena(usuario_id, descripcion);

        res.status(201).json({ newEscenaID }); // Devuelve directamente el ID
    } catch (error) {
        console.error('Error al crear la escena:', error);
        res.status(500).json({ message: 'Error al crear la escena' });
    }
});

router.get('/usuario/:id', async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.id);
        const escenas = await obtenerEscenasPorUsuarioId(usuarioId);
        res.json(escenas); // Devuelve las escenas en formato JSON
    } catch (error) {
        console.error('Error al obtener escenas:', error);
        res.status(500).json({ message: 'Error al obtener escenas' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const escenaId = parseInt(req.params.id);
        const { usuario_id, descripcion } = req.body;
        await actualizarEscena(escenaId, usuario_id, descripcion);
        res.send('Escena actualizada correctamente');
    } catch (error) {
        res.status(500).send('Error al actualizar la escena');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const escenaId = parseInt(req.params.id);
        await eliminarEscena(escenaId);
        res.send('Escena eliminada correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar la escena');
    }
});

module.exports = router;