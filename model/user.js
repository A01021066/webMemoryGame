let db = require('../public/database/connection');

//add a user to the database
//ranking the user based on score
function addUser(u){
    let sql = "INSERT INTO scoreboard (username, score) VALUES ('" + u.username + "', '" + u.score + "');";
    return db.execute(sql);
}

//get all of the users from database with desecending order of score.
function getAllUser(){
    return db.execute('SELECT * FROM scoreboard ORDER BY score DESC');
}

function getUserRank(u){
    return db.execute("SELECT COUNT(*) AS rank1 FROM (SELECT * FROM scoreboard WHERE score > " + u.score + ") compareTable");
}

module.exports = {
    add: addUser,
    getall: getAllUser,
    getrank: getUserRank
}