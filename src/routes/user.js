const { Router} = require('express')  /* Requerimos una función Router que viene de express */
const router = Router()

/*
* get all users
 */

 router.get('/', (req, res) => { /* Cuando visiten el raiz, respondemos con un archivo json que diga all users sent */
    return res.json('all users sent')
 });

 /*
 * Get a specific user
 */

 /* Como no tenemos conexion a base de datos vamos a hacer una simulacion */
router.get('/:id', (req, res) =>{
    if (req.params.id === "User0001"){
        return res.json('User User0001 found')
    }
    return res.status(404).json("User not found");
});

/* 
* Add User
*/
router.post('/', (req, res) => {
    const {username, password} = req.body; /* Para poder usar esto en el app.js se agrega app.use(express.json())  */
    if (username && password){
        return res.status(201).json('User created');
    }
    res.status(400).json("user not created")
});

module.exports = router