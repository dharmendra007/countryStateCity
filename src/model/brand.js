module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const Brand = sequelize.define(
        'Brand', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            brand_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'brand_name'
            },
            status: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'status'
            },
        }, {
            tableName: 'brands',
            timestamps: false
        }
    );
    return Brand;
};