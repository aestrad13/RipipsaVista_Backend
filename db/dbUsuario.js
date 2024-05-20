
async function obtenerUsuarios() {
    const pool = await connect();
    const result = await pool.request().execute('ReadUsuarios');
    return result.recordset;
}

async function obtenerUsuarioPorId(usuarioId) {
    const pool = await connect();
    const result = await pool.request()
        .input('usuario_id', sql.Int, usuarioId)
        .execute('ReadUsuarioById');
    return result.recordset[0];
}

// Crear usuario
async function crearUsuario(username, password) {
    try {
        console.log('Creando usuario con:', { username, password });
        const pool = await connect();
        const result = await pool.request()
            .input('username', sql.VarChar(100), username)
            .input('password', sql.VarChar(255), password)
            .execute('CreateUsuario');
        return result.recordset[0].NewUserID;
    } catch (error) {
        console.error('Error en dbUsuario:', error.message);
        throw error;
    }
}


async function autenticarUsuario(username, password) {
    const pool = await connect();
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .execute('ReadUsuarioByUsername'); // Asegúrate de que el nombre coincida con el SP
    return result.recordset[0]; // Devuelve el resultado del SP
}


async function actualizarUsuario(usuarioId, nombre) {
    const pool = await connect();
    await pool.request()
        .input('usuario_id', sql.Int, usuarioId)
        .input('nombre', sql.VarChar, nombre)
        .execute('UpdateUsuario');
}

async function eliminarUsuario(usuarioId) {
    const pool = await connect();
    await pool.request()
        .input('usuario_id', sql.Int, usuarioId)
        .execute('DeleteUsuario');
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    autenticarUsuario
};