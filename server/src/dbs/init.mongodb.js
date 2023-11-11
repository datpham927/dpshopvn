"use strict"
const mongoose = require("mongoose")

class Database {
    constructor() {
        this.connect()
    }
    connect(type="mongodb") {
        if (1 === 1) {
            mongoose.set("debug", true)
            mongoose.set("debug", { color: true })
        }
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("connected successfully!"))
        .catch(() => console.log("connection failed!"))
    }
    //   only init 1 connect
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb