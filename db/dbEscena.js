const { connect, sql } = require('./dbConn');

async function obtenerEscenas() {
    const pool = await connect();
    const result = await pool.request().execute('ReadEscenas');
    return result.recordset;
}

async function obtenerEscenasPorUsuarioId(usuarioId) {
    const pool = await connect();
    const result = await pool.request()
        .input('usuario_id', sql.Int, usuarioId)
        .execute('GetEscenasByUsuarioId');
    return result.recordset; // Devuelve todas las escenas
}

async function obtenerEscenaPorId(escenaId) {
    const pool = await connect();
    const result = await pool.request()
        .input('escena_id', sql.Int, escenaId)
        .execute('ReadEscenaById');
    return result.recordset[0];
}

async function createEscena(usuario_Id, desc) {
    const pool = await connect();
    const result = await pool.request()
        .input('usuario_id', sql.Int, usuario_Id)
        .input('descripcion', sql.VarChar, desc)
        .execute('CreateEscena');
    return result.recordset[0].NewEscenaID;
}

async function actualizarEscena(escenaId, usuarioId, descripcion) {
    const pool = await connect();
    await pool.request()
        .input('escena_id', sql.Int, escenaId)
        .input('usuario_id', sql.Int, usuarioId)
        .input('descripcion', sql.VarChar, descripcion)
        .execute('UpdateEscena');
}

async function eliminarEscena(escenaId) {
    const pool = await connect();
    await pool.request()
        .input('escena_id', sql.Int, escenaId)
        .execute('DeleteEscena');
}

module.exports = {
    obtenerEscenas,
    obtenerEscenaPorId,
    createEscena,
    actualizarEscena,
    eliminarEscena,
    obtenerEscenasPorUsuarioId
};