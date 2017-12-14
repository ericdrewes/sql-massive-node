const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const massive = require('massive');
	require('dotenv').config()

const port = 3000;

const products_controller = require('./products/products_controller');

const app = express();
app.use(cors());
app.use(json());

massive(process.env.CONNECTION_STRING).then( db => app.set('db', db) );

app.post('/api/product', products_controller.create);
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

app.listen(port, () => {console.log(`Listening on Port: ${port}`)});