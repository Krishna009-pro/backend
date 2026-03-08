const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Favorite = require("../Models/favouriteModel");

/*
class Home 
with following methods
1. save()
2. getAllHomes()
3. getHomeDetails(homeid)
4. deleteHome(homeid)

and variables
1. homename
2. price
3. location
4. rating
5. imageUrl
6. description
7. _id
*/


const homeSchema = new mongoose.Schema({
    homename: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: String,
    description: String
});

// pre save hook
homeSchema.pre("findOneAndDelete", async function () { // meaning - before deleting a home, delete its favorite
    const homeid = this.getQuery()._id;                 // getQuery() returns the query object of the current query; - this.getQuery()._id means the id of the home to be deleted
    await Favorite.deleteOne({ houseId: homeid });     // delete the favorite of the home to be deleted
});

module.exports = mongoose.model("Home", homeSchema);