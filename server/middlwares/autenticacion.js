var jwt = require('jsonwebtoken');

// Verificar el token
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEMILLA, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El token no es válido.'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};

// Verificar que sea admin
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN') {
        next();

    } else {

        return res.status(401).json({
            ok: false,
            err: {
                message: 'Se necesita ser ADMIN para ejecutar esto.'
            }
        });
    }

};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}