const sql = require('mssql');

const config = {
    user: 'SA',
    password: 'Diego0404',
    server: '192.168.100.241',
    port: 1433,
    database: 'RipipsaVista',
    authentication: {
        type: 'default'
    },
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
};

async function connect() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Failed to connect to SQL Server:', err);
        throw err;
    }
}

// Ejecuta la función connect si el archivo es ejecutado directamente
if (require.main === module) {
    connect().then(() => {
        console.log('Connection attempt finished.');
    });
}

module.exports = { connect, sql };
