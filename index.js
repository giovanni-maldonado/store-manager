const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

app.get('/products', productsController.getAllProducts);
app.get('/products/:id', productsController.getProductById);
app.post('/products', productsController.create);
app.put('/products/:id', productsController.editProductById);
app.delete('/products/:id', productsController.deleteProductById);

app.get('/sales', salesController.getAllSales);
app.get('/sales/:id', salesController.getSaleById);
app.post('/sales', salesController.create);
app.put('/sales/:id', salesController.editSaleById);
app.delete('/sales/:id', salesController.deleteSaleById);

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`porta ${PORT} aqui`);
});