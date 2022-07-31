module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const Measurement = sequelize.define(
        'Measurement', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            measurement: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'measurement'
            },
            status: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'status'
            },
        }, {
            tableName: 'measurements',
            timestamps: false
        }
    );
    return Measurement;
};