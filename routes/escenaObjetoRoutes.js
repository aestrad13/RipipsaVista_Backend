const express = require('express');
const router = express.Router();
const { obtenerEscenaObjetos, obtenerEscenaObjetoPorId, obtenerEscenaObjetosPorEscenaId, crearEscenaObjeto, actualizarEscenaObjeto, eliminarEscenaObjeto, obtenerMaxEscenaId } = require('../db/dbEscenaObjeto');

router.get('/', async (req, res) => {
    try {
        const escenaObjetos = await obtenerEscenaObjetos();
        res.json(escenaObjetos);
    } catch (error) {
        res.status(500).send('Error al obtener los escenaObjetos');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const escenaObjeto = await obtenerEscenaObjetoPorId(parseInt(id));
        if (escenaObjeto) {
            res.json(escenaObjeto);
        } else {
            res.status(404).send('EscenaObjeto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el EscenaObjeto');
    }
});

router.get('/max-escena-id', async (req, res) => {
    try {
        const maxEscenaId = await obtenerMaxEscenaId();
        res.json({ maxEscenaId });
    } catch (error) {
        res.status(500).send('Error al obtener el máximo escena_id');
    }
});


router.get('/por-escena/:escenaId', async (req, res) => {
    try {
        const { escenaId } = req.params;
        const escenaObjetos = await obtenerEscenaObjetosPorEscenaId(parseInt(escenaId));
        if (escenaObjetos.length > 0) {
            res.json(escenaObjetos);
        } else {
            res.status(404).send('EscenaObjetos no encontrados para la escena especificada');
        }
    } catch (error) {
        res.status(500).send('Error al obtener los EscenaObjetos');
    }
});

router.post('/', async (req, res) => {
    try {
        const { escena_id, objeto_id, position, scale, rotation } = req.body;
        const newEscenaObjetoId = await crearEscenaObjeto(escena_id, objeto_id, position, scale, rotation);
        res.status(201).send(`EscenaObjeto creado con ID: ${newEscenaObjetoId}`);
    } catch (error) {
        res.status(500).send('Error al crear el escenaObjeto');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { posicion, scale, rotation } = req.body;
        await actualizarEscenaObjeto(parseInt(id), posicion, scale, rotation);
        res.send('EscenaObjeto actualizado correctamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el EscenaObjeto');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarEscenaObjeto(parseInt(id));
        res.send('EscenaObjeto eliminado correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar el EscenaObjeto');
    }
});

module.exports = router;