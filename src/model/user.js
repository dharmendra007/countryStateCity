module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const Users = sequelize.define(
        'Users', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            email: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'email'
            },
            password: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'password'
            },
            first_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'first_name'
            },
            last_name: {
                type: DataTypes.STRING(200),
                allowNull: false,
                field: 'last_name'
            },
            role_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'role_id'
            },
            status: {
                type: DataTypes.STRING(200),
                allowNull: true,
                field: 'status'
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
            tableName: 'users',
            timestamps: false
        }
    );
    return Users;
};