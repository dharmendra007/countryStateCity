module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const RemainingStock = sequelize.define(
        'RemainingStock', {
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
            branch_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'branch_id'
            },
            stock_remaining: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'stock_remaining'
            }
        }, {
            tableName: 'remaining_stock',
            timestamps: false
        }
    );
    return RemainingStock;
};