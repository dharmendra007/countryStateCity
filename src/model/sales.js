module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const Sales = sequelize.define(
        'Sales', {
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
            total_item_count: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'total_item_count'
            },
            total_sale_price: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'total_sale_price'
            },
            sales_type_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'sales_type_id'
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                field: 'created_at'
            },
            created_by: {
                type: DataTypes.NUMBER,
                allowNull: true,
                field: 'created_by'
            }
        }, {
            tableName: 'sales',
            timestamps: false
        }
    );
    return Sales;
};