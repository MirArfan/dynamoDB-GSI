const dynamodb = require("../database/db");

const User = {
    async create({ id, name, email, phone }) {
        const params = {
            TableName: "user",
            Item: {
                id,
                name,
                email,
                phone
            }
        };
        try {
            await dynamodb.put(params).promise();
            return { id, name, email, phone };
        } catch (error) {
            console.error("Error adding user:", error);
            throw new Error("Error adding user");
        }
    },

    async getById(id) {
        const params = {
            TableName: "user",
            Key: { id }
        };
        try {
            const data = await dynamodb.get(params).promise();
            if (!data.Item) {
                throw new Error("User not found");
            }
            return data.Item;
        } catch (error) {
            console.error("Error retrieving user:", error);
            throw new Error("Error retrieving user");
        }
    },

    async getByEmail(email) {
        const params = {
            TableName: "user",
            IndexName: "email_index",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            }
        };
        try {
            const data = await dynamodb.query(params).promise();
            return data.Items;
        } catch (error) {
            console.error("Error retrieving user by email:", error);
            throw new Error("Error retrieving user by email");
        }
    },

    async getByPhone(phone) {
        const params = {
            TableName: "user",
            IndexName: "phone_index",
            KeyConditionExpression: "phone = :phone",
            ExpressionAttributeValues: {
                ":phone": phone
            }
        };
        try {
            const data = await dynamodb.query(params).promise();
            return data.Items;
        } catch (error) {
            console.error("Error retrieving user by phone:", error);
            throw new Error("Error retrieving user by phone");
        }
    },

    async update({ id, name, email, phone }) {
        const params = {
            TableName: "user",
            Key: { id },
            UpdateExpression: "set #name = :name, email = :email, phone = :phone",
            ExpressionAttributeNames: {
                "#name": "name"
            },
            ExpressionAttributeValues: {
                ":name": name,
                ":email": email,
                ":phone": phone
            },
            ReturnValues: "UPDATED_NEW"
        };
        try {
            const data = await dynamodb.update(params).promise();
            return data.Attributes;
        } catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    },

    async delete(id) {
        const params = {
            TableName: "user",
            Key: { id }
        };
        try {
            await dynamodb.delete(params).promise();
            return { message: "User deleted successfully" };
        } catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }
};

module.exports = User;
