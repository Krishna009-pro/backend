// Local Module
const { getDB } = require("../utils/databaseUtils");
const { ObjectId } = require("mongodb");

module.exports = class Home {

    constructor(homename, price, location, rating, imageUrl, description, _id) {
        this.homename = homename;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.imageUrl = imageUrl;
        this.description = description;
        if (_id) {
            this._id = _id;
        }
    }

    save() {
        const db = getDB();
        if (this._id) {
            const homeid = this._id;
            delete this._id;
            return db.collection("homes").updateOne({ "_id": new ObjectId(homeid) }, { $set: this });
        }
        return db.collection("homes").insertOne(this);
    }

    static getAllHomes() {
        const db = getDB();
        return db.collection("homes").find().toArray();
    }

    static getHomeDetails(homeid) {
        const db = getDB();
        return db.collection("homes").findOne({ "_id": new ObjectId(String(homeid)) });
    }

    static deleteHome(homeid) {
        const db = getDB();
        return db.collection("homes").deleteOne({ "_id": new ObjectId(homeid) });
    }

}