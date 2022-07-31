module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const ProductCategory = sequelize.define(
        'ProductCategory', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            product_category_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'product_category_name'
            },
            status: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'status'
            },
        }, {
            tableName: 'product_categories',
            timestamps: false
        }
    );
    return ProductCategory;
};