const express = require('express');
const router = express.Router();
const { obtenerObjetos, obtenerObjetoPorId, obtenerUrlPorId, crearObjeto, actualizarObjeto, eliminarObjeto } = require('../db/dbObjeto');

router.get('/', async (req, res) => {
    try {
        const objetos = await obtenerObjetos();
        res.json(objetos);
    } catch (error) {
        res.status(500).send('Error al obtener los objetos: ' + error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const objetoId = parseInt(req.params.id);
        const objeto = await obtenerObjetoPorId(objetoId);
        if (objeto) {
            res.json(objeto);
        } else {
            res.status(404).send('Objeto no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el objeto: ' + error.message);
    }
});

router.get('/:id/url', async (req, res) => {
    try {
        const objetoId = parseInt(req.params.id);
        const urls = await obtenerUrlPorId(objetoId);
        if (urls) {
            res.json(urls);
        } else {
            res.status(404).send('URLs no encontradas para el objeto especificado');
        }
    } catch (error) {
        res.status(500).send('Error al obtener las URLs del objeto: ' + error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { nombre, obj, mtl } = req.body;
        const newObjetoId = await crearObjeto(nombre, obj, mtl);
        res.status(201).send(`Objeto creado con ID: ${newObjetoId}`);
    } catch (error) {
        res.status(500).send('Error al crear el objeto: ' + error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const objetoId = parseInt(req.params.id);
        const { nombre, obj, mtl } = req.body;
        await actualizarObjeto(objetoId, nombre, obj, mtl);
        res.send('Objeto actualizado correctamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el objeto: ' + error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const objetoId = parseInt(req.params.id);
        await eliminarObjeto(objetoId);
        res.send('Objeto eliminado correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar el objeto: ' + error.message);
    }
});

module.exports = router;