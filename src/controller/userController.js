const User = require("../model/User");

exports.createUser = async (ctx) => {
    const { id, name, email, phone } = ctx.request.body;

    if (!id || !name || !email || !phone) {
        ctx.status = 400;
        ctx.body = { error: "Missing required fields" };
        return;
    }

    try {
        const data = await User.create({ id, name, email, phone });
        console.log("User added successfully");
        ctx.status = 201;
        ctx.body = data;
    } catch (error) {
        console.error("Failed to add user:", error);
        ctx.status = 500;
        ctx.body = { error: "Failed to add user" };
    }
};

exports.getUserById = async (ctx) => { 
    const { id } = ctx.params;
    
    if (!id) {
        ctx.status = 400;
        ctx.body = { error: "Missing user ID" };
        return;
    }

    try {
        const data = await User.getById(id);
        if (data) {
            ctx.status = 200;
            ctx.body = data;
        } else {
            ctx.status = 404;
            ctx.body = { error: "User not found" };
        }
    } catch (error) {
        console.error("Failed to retrieve user:", error);
        ctx.status = 500;
        ctx.body = { error: "Failed to retrieve user" };
    }
};

exports.getUserByPhone = async (ctx) => {
    const { phone } = ctx.params;

    if (!phone) {
        ctx.status = 400;
        ctx.body = { error: "Missing phone number" };
        return;
    }

    try {
        const data = await User.getByPhone(phone);
        if (data.length === 0) {
            ctx.status = 404;
            ctx.body = { error: "User not found" };
            return;
        }
        ctx.status = 200;
        ctx.body = data;
    } catch (err) {
        console.error("Failed to retrieve user by phone:", err);
        ctx.status = 500;
        ctx.body = { error: "Failed to retrieve user by phone" };
    }
};


exports.updateUser = async (ctx) => {
    const { id, name, email, phone } = ctx.request.body;

    if (!id || !name || !email || !phone) {
        ctx.status = 400;
        ctx.body = { error: "Missing required fields" };
        return;
    }

    try {
        const data = await User.update({ id, name, email, phone });
        console.log("User updated successfully");
        ctx.status = 200;
        ctx.body = { message: "User updated successfully", data };
    } catch (error) {
        console.error("Failed to update user:", error);
        ctx.status = 500;
        ctx.body = { error: "Failed to update user" };
    }
};

exports.deleteUser = async (ctx) => {
    const { id } = ctx.params;
    
    if (!id) {
        ctx.status = 400;
        ctx.body = { error: "Missing user ID" };
        return;
    }

    try {
        await User.delete(id);
        console.log("User deleted successfully");
        ctx.status = 200;
        ctx.body = { message: "User deleted successfully" };
    } catch (error) {
        console.error("Failed to delete user:", error);
        ctx.status = 500;
        ctx.body = { error: "Failed to delete user" };
    }
};
