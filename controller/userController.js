let model = require('../model/user');
let uObject;
let list;

exports.getAllUser = (req, res, next) =>{
    model.getall().then(([listing, fieldData]) => {list = listing});
    model.getrank(uObject).then(([rank]) => {
        res.render('ranking', {users: list, userRank: rank, userScore: uObject.score});
    });


}

exports.getAddUser = (req, res, next) => {
    res.render('summary');
}

exports.postAddUser = (req, res, next) => {
    let u_name = req.body.username;
    let u_score = req.body.score;

    uObject = {
        username: u_name,
        score: u_score
    }

    model.add(uObject);

    res.redirect(301, '/ranking')
}