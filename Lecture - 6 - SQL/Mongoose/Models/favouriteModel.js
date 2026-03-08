
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

/*
class Favorites 
with following methods
1. addToFavourite(id)
2. getAllFavorites()
3. removeFromFavorites(id)
*/

const favouriteSchema = new mongoose.Schema({
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home",
        required: true,
        unique: true
    }
});



module.exports = mongoose.model("Favorite", favouriteSchema);