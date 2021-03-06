const { ObjectId } = require('bson');
const getConnection = require('./connection');

const create = async (name, quantity) => {
  const db = await getConnection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

const findByName = async (name) => {
  const db = await getConnection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getAllProducts = async () => {
  const db = await getConnection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const editProductById = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { id, name, quantity };
};

const deleteProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = { 
  create, 
  findByName,
  getAllProducts,
  getProductById,
  editProductById,
  deleteProductById,
};
