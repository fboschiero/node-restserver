const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let roles = {
    values: ['ADMIN', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido.'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario.']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario.']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

usuarioSchema.method.toJSON = function() {

    let user = this;
    let userObject = this.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);