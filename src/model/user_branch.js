module.exports = (sequelize, DataTypes) => {
    // schema for user table
    const UserBranch = sequelize.define(
        'UserBranch', {
            id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'id'
            },
            user_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'user_id'
            },
            branch_id: {
                type: DataTypes.NUMBER,
                allowNull: false,
                field: 'branch_id'
            }
        }, {
            tableName: 'user_branches',
            timestamps: false
        }
    );
    return UserBranch;
};