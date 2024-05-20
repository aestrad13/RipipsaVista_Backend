const { connect, sql } = require('./dbConn');

async function obtenerEscenaObjetos() {
    const pool = await connect();
    const result = await pool.request().execute('ReadEscenaObjetos');
    return result.recordset;
}

async function obtenerEscenaObjetoPorId(escenaId) {
    const pool = await connect();
    const result = await pool.request()
        .input('escena_id', sql.Int, escenaId)
        .execute('ReadEscenaObjetosByEscenaId');
    return result.recordset;
}

async function obtenerMaxEscenaId() {
    try {
        const pool = await connect();
        const result = await pool.request().execute('GetMaxEscenaIdFromEscenaObjeto');
        return result.recordset[0].MaxEscenaId;
    } catch (error) {
        console.error('Error ejecutando GetMaxEscenaIdFromEscenaObjeto:', error.message);
        return null;
    }
}

async function obtenerEscenaObjetosPorEscenaId(escenaId) {
    const pool = await connect();
    const result = await pool.request()
        .input('escena_id', sql.Int, escenaId)
        .execute('ReadEscenaObjetosByEscenaId');
    return result.recordset;
}

async function crearEscenaObjeto(escena_id, objeto_id, position, scale, rotation) {
    const pool = await connect();
    const result = await pool.request()
        .input('escena_id', sql.Int, escena_id)
        .input('objeto_id', sql.Int, objeto_id)
        .input('position', sql.VarChar, position)
        .input('scale', sql.VarChar, scale)
        .input('rotation', sql.VarChar, rotation)
        .execute('CreateEscenaObjeto');
    return result.recordset[0].NewEscenaObjetoID;
}

async function actualizarEscenaObjeto(id, position, scale, rotation) {
    const pool = await connect();
    await pool.request()
        .input('id', sql.Int, id)
        .input('position', sql.VarChar, position)
        .input('scale', sql.VarChar, scale)
        .input('rotation', sql.VarChar, rotation)
        .execute('UpdateEscenaObjeto');
}


async function eliminarEscenaObjeto(id) {
    const pool = await connect();
    await pool.request()
        .input('id', sql.Int, id)
        .execute('DeleteEscenaObjeto');
}

module.exports = {
    obtenerEscenaObjetos,
    obtenerEscenaObjetoPorId,
    crearEscenaObjeto,
    actualizarEscenaObjeto,
    eliminarEscenaObjeto,
    obtenerEscenaObjetosPorEscenaId,
    obtenerMaxEscenaId
};