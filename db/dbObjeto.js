const { connect, sql } = require('./dbConn');

async function obtenerObjetos() {
    const pool = await connect();
    const result = await pool.request().execute('ReadObjetos');
    return result.recordset;
}

async function obtenerObjetoPorId(objetoId) {
    const pool = await connect();
    const result = await pool.request()
        .input('objeto_id', sql.Int, objetoId)
        .execute('ReadObjetoById');
    return result.recordset[0];
}

async function obtenerUrlPorId(objetoId) {
    const pool = await connect();
    const result = await pool.request()
        .input('objeto_id', sql.Int, objetoId)
        .execute('GetObjetoUrlById');
    if (result.recordset[0]) {
        return { obj: result.recordset[0].obj, mtl: result.recordset[0].mtl };
    } else {
        return null;
    }
}

async function crearObjeto(nombre, obj, mtl) {
    const pool = await connect();
    const result = await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('obj', sql.VarChar, obj)
        .input('mtl', sql.VarChar, mtl)
        .execute('CreateObjeto');
    return result.recordset[0].NewObjetoID;
}

async function actualizarObjeto(objetoId, nombre, obj, mtl) {
    const pool = await connect();
    await pool.request()
        .input('objeto_id', sql.Int, objetoId)
        .input('nombre', sql.VarChar, nombre)
        .input('obj', sql.VarChar, obj)
        .input('mtl', sql.VarChar, mtl)
        .execute('UpdateObjeto');
}

async function eliminarObjeto(objetoId) {
    const pool = await connect();
    await pool.request()
        .input('objeto_id', sql.Int, objetoId)
        .execute('DeleteObjeto');
}

module.exports = {
    obtenerObjetos,
    obtenerObjetoPorId,
    obtenerUrlPorId,
    crearObjeto,
    actualizarObjeto,
    eliminarObjeto
};