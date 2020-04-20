const express = require('express');
const app = express();

const { verificaToken } = require('../middlwares/autenticacion');

const Producto = require('../models/producto');

// Obtiene todos los productos
app.get('/producto', verificaToken, (req, res) => {

    Producto.find({ disponible: true })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

})

//Buscar productos
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regexp = new RegExp(termino, 'i');

    Producto.find({ nombre: regexp, disponible: false })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

})

// Obtiene un producto por id
app.get('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.find(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'El producto no existe'
                });
            }

            res.json({
                ok: true,
                producto
            });

        });

})

// crear un nuevo producto
app.post('/producto', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });

})

// actualizar un nuevo producto
app.post('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'El producto no existe.'
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        //productoDB.categoria = body.categoria;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            return res.json({
                ok: true,
                producto: productoGuardado
            });
        });

    });

})

// borrar un nuevo producto
app.delete('/producto/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'El producto no existe.'
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            return res.json({
                ok: true,
                producto: productoGuardado,
                message: 'El producto ha sido borrado'
            });
        });

    });

})

module.exports = app;