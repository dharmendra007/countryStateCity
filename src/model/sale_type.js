module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const SaleTypes = sequelize.define(
        'SaleTypes', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'name'
            },
            status: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'status'
            },
        }, {
            tableName: 'sale_types',
            timestamps: false
        }
    );
    return SaleTypes;
};