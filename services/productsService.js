const productsModel = require('../models/productsModel');

const minNameLength = 5;
const minQuantity = 1;
const nameErr = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};
const minQuantityErr = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};
const quantityStringErr = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const getAllProducts = async () => {
  const products = productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = productsModel.getProductById(id);
  return product;
};

const create = async (name, quantity) => {
  if (name.length < minNameLength) return nameErr;

  if (quantity < minQuantity) return minQuantityErr;

  if (typeof (quantity) === 'string') return quantityStringErr;

  const exists = await productsModel.findByName(name);

  if (exists) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } };
  }

  const product = await productsModel.create(name, quantity);
  return { product };
};

const editProductById = async (id, name, quantity) => {
  if (name.length < minNameLength) return nameErr;

  if (quantity < minQuantity) return minQuantityErr;

  if (typeof (quantity) === 'string') return quantityStringErr;

  const product = await productsModel.editProductById(id, name, quantity);
  return { product };
};

const deleteProductById = async (id) => {
  const product = productsModel.deleteProductById(id);
  return product;
};

module.exports = { 
  create,
  getAllProducts,
  getProductById,
  editProductById,
  deleteProductById,
};