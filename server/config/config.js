// PUERTO
process.env.PORT = process.env.PORT || 3000

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// Vencimiento del token
// 60 segundos
// 60 minutos
// 12 hora
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 12 * 30;

// Seed de autenticacion
process.env.SEMILLA = process.env.SEMILLA || 'este-es-el-seed-de-desarrollo';

// BASE DE DATOS

let urlDB

if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb+srv://cebolla:FvDRCQlLwNuT5jrw@cluster0-9dqlt.mongodb.net/cafe';
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;