const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) { 
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        timestamps: true,
        underscored: true,
        tableName: 'products'
    };
    
    return sequelize.define('Product', attributes, options);
}