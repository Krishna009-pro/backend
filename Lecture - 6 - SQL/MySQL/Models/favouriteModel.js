
const conn = require("../utils/databaseUtils");

module.exports = class Favorites {

    static addToFavourite(id) {
        return conn.execute('INSERT INTO favs (Id) VALUES (?)', [id]);
    }


    static getAllFavorites() {
        return conn.execute('SELECT * FROM homes where Id in (SELECT Id from favs)');
    }

    static removeFromFavorites(id) {
        return conn.execute('DELETE FROM favs WHERE Id = ?', [id]);
    }
}