const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}

async function getById(id) {
    return await getProduct(id);
}

async function create(params) {
    if (await db.Product.findOne({ where: { name: params.name } })) {
        throw 'Product "' + params.name + '" already exists';
    }

    return await db.Product.create(params);
}

async function update(id, params) {
    const product = await getProduct(id);

    if (params.name && product.name !== params.name) {
        if (await db.Product.findOne({ where: { name: params.name } })) {
            throw 'Product "' + params.name + '" already exists';
        }
    }

    Object.assign(product, params);
    await product.save();

    return product;
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}