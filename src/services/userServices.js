const Sequelize = require("sequelize");
const db = require("../model/index");

// Including models
const { Users, UserBranch, Branch } = db.sequelize.models;
const bcrypt = require("bcryptjs");
// including constant file
const CONSTANTS = require('../shared/constants');

//authenticates only registered users
const login = async(req, res) => {
    const email = req.email;
    const password = req.password;
    var userdetails = "";
    // Get user details
    const getUser = await Users.findAll({
        raw: true,
        attributes: [
            "id",
            "email",
            "first_name",
            "password",
            "last_name",
            "role_id",
            "status",
        ],
        where: {
            email,
        },
    });

    if (getUser.length) {
        const hashpassword = bcrypt.compareSync(password, getUser[0].password);
        if (hashpassword) {
            userdetails = getUser;
        }
    }
    return userdetails;
};


//authenticates only registered users
const register = async(req, res) => {
    const password = bcrypt.hashSync(req.password, 4);
    const email = req.email;
    const first_name = req.first_name;
    const last_name = req.last_name;
    const user_branches = req.user_branches;
    const created_by = userId;
    let role_id = 0;
    if (userRoleId != CONSTANTS.USER) {
        let getData = await Users.findAll({
            where: { email: email },
            order: [
                ["id", "DESC"]
            ],
        });
        if (getData.length) {
            return { status: "error", message: CONSTANTS.USER_ALREADY_EXIST };
        } else {

            // Check if branch id exist or not
            let branchFlag = true;
            let existBranchID = 0;
            for (var user_branch = 0; user_branch < user_branches.length; user_branch++) {
                const branchExist = await Branch.findAll({
                    where: {
                        id: user_branches[user_branch],
                        status: CONSTANTS.ACTIVE
                    },
                    attribute: ['id'],
                });
                if (!branchExist.length && branchFlag == true) {
                    branchFlag = false;
                    existBranchID = user_branches[user_branch];
                }
            }

            // Set role id dynamically and branches validation
            if (branchFlag == true) {
                if (userRoleId == CONSTANTS.SUPER_ADMIN) {
                    role_id = CONSTANTS.ADMIN;
                } else if (userRoleId == CONSTANTS.ADMIN) {
                    role_id = CONSTANTS.USER;
                }

                // Check if user have more than 1 branches selcted by admin
                let flag = true;
                if (role_id == CONSTANTS.USER) {
                    if (user_branches.length > 1) {
                        flag = false;
                        return { status: "error", message: CONSTANTS.USER_SHOULD_HAVE_ONLY_ONE_BRANCH };
                    }
                }

                if (flag == true) {
                    // Check one branch should have only one admin
                    let adminExistFlag = false;
                    let adminExistBranch = 0;
                    for (var user_branch = 0; user_branch < user_branches.length; user_branch++) {

                        let adminExist = await db.sequelize.query(
                            'select users.id from users join user_branches on users.id=user_branches.user_id where user_branches.branch_id=(:branch_id) and users.role_id=(:role_id)', {
                                replacements: {
                                    branch_id: user_branches[user_branch],
                                    role_id: CONSTANTS.ADMIN
                                },
                                type: db.sequelize.QueryTypes.SELECT,
                            }
                        );
                        if (adminExist.length > 0 && adminExistFlag == false && userRoleId == CONSTANTS.SUPER_ADMIN) {
                            adminExistFlag = true
                            adminExistBranch = user_branches[user_branch];
                        }
                    }

                    if (adminExistFlag == false) {
                        const addUserData = {
                            email,
                            password,
                            first_name,
                            last_name,
                            role_id,
                            created_by
                        };

                        // Insert into user table
                        await Users.create(addUserData);

                        // Get last inserted ID
                        let userData = await Users.findAll({
                            where: { email: email },
                            attribute: ['id'],
                            raw: true,
                        });

                        // Insert into UserBranches table
                        for (var user_branch = 0; user_branch < user_branches.length; user_branch++) {
                            const userBranch = {
                                user_id: userData[0].id,
                                branch_id: user_branches[user_branch]
                            }
                            await UserBranch.create(userBranch);
                        }

                        return { status: 200, data: userData };
                    } else {
                        return { status: "error", message: "Branch id (" + adminExistBranch + ") have already an admin, One branch can have only one admin" };
                    }
                }
            } else {
                return { status: "error", message: "Branch id (" + existBranchID + ") not exist in record" };
            }
        }
    } else {
        return { status: "error", message: CONSTANTS.NOT_ACCESS };
    }
}

module.exports = {
    login,
    register
};