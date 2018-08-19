var friends = require('../data/friends.js');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });


    app.post('/api/friends', function(req, res){

        // Creating object to house the best match
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 50
        };

        // pulling data from request
        var newUserScores = req.body.scores;
        var totalDifference = 0;

        //loop through scores of survery
        for (var i = 0; i < friends.length; i++){
            console.log(friends[i].name);
            totalDifference = 0;
            // loop through answers to calculate compatibility differences and set bestMatch
            for (var j = 0; j < 10; j++) {
                totalDifference += Math.abs(parseInt(newUserScores[j]) - parseInt(friends[i].scores[j]));
                if (totalDifference <= bestMatch.friendDifference){
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        //push new user data and res the bestMatch
        friends.push(req.body);
        res.json(bestMatch);
    });
};