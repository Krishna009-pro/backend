
const { getDB } = require("../utils/databaseUtils");
const { ObjectId } = require("mongodb");

module.exports = class Favorites {

    static addToFavourite(id) {
        const db = getDB();
        // push isFavourite to true using push method
        return db.collection("homes").updateOne({ _id: new ObjectId(id) }, { $set: { isFavourite: true } })

    }

    static getAllFavorites() {
        const db = getDB();
        return db.collection("homes").find({ isFavourite: true }).toArray();
    }

    static removeFromFavorites(id) {
        const db = getDB();
        return db.collection("homes").updateOne({ _id: new ObjectId(id) }, { $set: { isFavourite: false } });
    }
}