module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const Branch = sequelize.define(
        'Branch', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            branch_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'branch_name'
            },
            address: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'address'
            },
            city_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'city_name'
            },
            status: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'status'
            },
        }, {
            tableName: 'branches',
            timestamps: false
        }
    );
    return Branch;
};