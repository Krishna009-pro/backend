const express = require("express");
const storeRouter = express.Router();

const storeController = require("../Controller/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home-list", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favorites-list", storeController.getFavoritesList);
storeRouter.get("/home-details/:id", storeController.getHomeDetails);
storeRouter.post("/favorites-list", storeController.AddToFavorites);
storeRouter.post("/remove-from-favorites/:id", storeController.postRemoveFromFavrites);

exports.storeRouter = storeRouter;