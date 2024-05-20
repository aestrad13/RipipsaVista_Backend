const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const objetoRoutes = require('./routes/objetoRoutes');
const escenaRoutes = require('./routes/escenaRoutes');
const escenaObjetoRoutes = require('./routes/escenaObjetoRoutes');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/objetos', objetoRoutes);
app.use('/escenas', escenaRoutes);
app.use('/escenaObjetos', escenaObjetoRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en port: ${PORT}`);
});