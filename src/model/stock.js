module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const Stock = sequelize.define(
        'Stock', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
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
            quantity: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'quantity'
            },
            branch_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'branch_id'
            },
            unit_price: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'unit_price'
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                field: 'created_at'
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                field: 'updated_at'
            },
            created_by: {
                type: DataTypes.NUMBER,
                allowNull: true,
                field: 'created_by'
            }
        }, {
            tableName: 'stocks',
            timestamps: false
        }
    );
    return Stock;
};