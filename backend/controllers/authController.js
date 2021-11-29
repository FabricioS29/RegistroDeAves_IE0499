const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');



// Sign up (Registrarse)
exports.signup = (req, res) => {
    console.log('req.body', req.body); // imprime el body: {"name:" "Arturo Filio", "email:" "test@test.com", "password:" "test123"}
    const user = new User(req.body); // crear nuevo usurario
    user.save((error, user) => {
        console.log("Punto final del registro")
        if (error) {
            return res.status(400).json({
                message: "Por favor revisar, hubo un error"
            })
        }
        user.salt = undefined; // Cuando se guarde el usuario no queremos que se vea la salt ni el hash
        user.hashed_password = undefined;
        res.json({ //Regresa el usuario
            user
        })
    })
}


// sing in / login (ingresar)
exports.signin = (req, res) => {
    // Encontrar al usuario en el correo electrónico
    const {email, password} = req.body // Requerir del body (User) el email y password
    User.findOne({email}, (error, user) => {
        if (error||!user) {
            return res.status(400).json({
                error: 'El usuario con ese correo electrónico no existe'
            });
        }
        // Si se encuentra el usuario asegurar que correo y contraseña coincidan
        // Crear método de auntenticación en el modelo de usuario
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'El correo electrónico y la contraseña no coinciden'
            });
        }
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 }) 
        // Crear un token con un nivel de seguridad
        // Conservar el token como 't' en la cookie con fecha de vencimiento
        
        res.cookie('t', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
        //res.cookie('t', token, {expire: new Date(0) })
        //res.cookie('t', token, { maxAge: 6, httpOnly: true })
        //res.cookie('t', token, {expires: new Date(Date.now() + 6000), httpOnly : false })

        // Devolver la respuesta con el usuario y el token al cliente en el front
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}})
    });
}

// Cerrar sesión
exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: "Éxito al cerrar sesión"});
};


