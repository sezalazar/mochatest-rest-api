const express = require('express')
const app = express() /* app es nuestro servidor */

app.use(express.json()) /* para entender los request body que vienen. Es necesario que esto vaya antes de las rutas para que funcione */
app.use('/users', require('./routes/user')) /* Cada vez que vayan a la ruta /users quiero que utilices lo que viene de del archivo user.js */

app.listen(3000) /* le digo que escuche en el puerto 3000 */
console.log('Server on port 3000')

module.exports = app