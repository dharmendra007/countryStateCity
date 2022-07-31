module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const SalesTransation = sequelize.define(
        'SalesTransation', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            transaction_no: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'transaction_no'
            },
            unit_sale_price: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'unit_sale_price'
            },
            item_count: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'item_count'
            },
            brand_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'brand_id'
            },
            product_category_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'product_category_id'
            },
            measurement_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'measurement_id'
            },
            branch_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'branch_id'
            }
        }, {
            tableName: 'sales_by_transaction_id',
            timestamps: false
        }
    );
    return SalesTransation;
};