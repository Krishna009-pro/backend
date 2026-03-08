// Local Module
const conn = require("../utils/databaseUtils");


module.exports = class Home {

    constructor(homename, price, location, rating, imageUrl, description, id) {
        this.homename = homename;
        this.price = price;
        this.rating = rating;
        this.location = location;
        this.imageUrl = imageUrl;
        this.description = description;
        this.id = id;
    }

    save() {
        return conn.execute('Insert into homes (homename, price, location, rating, imageUrl, description) VALUES (?, ?, ?, ?, ?, ?)', [
            this.homename, this.price, this.location, this.rating, this.imageUrl, this.description
        ]);
    }

    static getAllHomes() {
        return conn.execute('SELECT * from homes');
    }

    static getHomeDetails(homeid) {
        return conn.execute('SELECT * from homes where id = ?', [homeid]);
    }

    static deleteHome(homeid) {
        return conn.execute('DELETE from homes where id = ?', [homeid]);
    }

    static updateHome(homeid, homename, price, location, rating, imageUrl, description) {
        return conn.execute('UPDATE homes SET homename = ?, price = ?, location = ?, rating = ?, imageUrl = ?, description = ? where id = ?', [
            homename, price, location, rating, imageUrl, description, homeid
        ]);
    }
}