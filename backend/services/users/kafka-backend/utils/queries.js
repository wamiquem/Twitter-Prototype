const con = require('../../kafka-backend/mysql_connection');

var queries = {};

queries.createUser = (user, hash, successcb, failurecb) => {
    let sql = "INSERT INTO users (email, password, fname, lname, username, phone, image, added_date) VALUES ?";
    const values = [user.email, hash, user.fname, user.lname, user.username, user.phone, 
        'https://twitter-prototype-project.s3-us-west-1.amazonaws.com/default_profile_pic.jpg', new Date().toLocaleString()]
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.authenticateUser = (id, successcb, failurecb) => {
    let sql = 'SELECT id, email FROM users WHERE id = ?';
    con.query(sql, [id], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getUserPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password, username, id, image FROM users WHERE email = ?';
    con.query(sql, [email], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getUsernameById = (id, successcb, failurecb) => {
    let sql = 'SELECT username FROM users WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getUserImageNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT image FROM users WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getUserDetailsById = (id, successcb, failurecb) => {
    let sql = `SELECT fname, lname, phone, email, username, bio, city, state, zip_code, image, added_date
    FROM users WHERE id = ?`;

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateUserProfile = (user, successcb, failurecb) => {
    let sql = `UPDATE users 
    SET fname =?, lname =?, phone = ?, username = ?, bio = ?, city = ?, state = ?, zip_code = ?, image = ?
    WHERE id = ?`;
    let values = [user.fname, user.lname, user.phone, user.username, user.bio, 
        user.city, user.state, user.zip, user.imageUrl, user.id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.addFollower = (users, successcb, failurecb) => {
    let sql = "INSERT INTO follows (follower, leader, leader_username) VALUES ?";
    const values = [users.follower, users.leader, users.leader_username]
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.removeFollower = (users, successcb, failurecb) => {
    let sql = 'DELETE FROM follows WHERE follower = ? and leader=?';
    
    con.query(sql, [users.follower,users.leader], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getAllMatchingUsers = (username, successcb, failurecb) => {
    let sql = `SELECT id, username, image
    FROM users WHERE username like '%${username}%'`;
    let values = [username];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getSpecificUser = (id, successcb, failurecb) => {
    let sql = `SELECT id, username, image
    FROM users WHERE id = ?`;
    let values = [id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result[0]);
    });
}

queries.getAllLeaders = (follower, successcb, failurecb) => {
    let sql = `SELECT leader, leader_username
    FROM follows WHERE follower = ?`;
    let values = [follower];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

module.exports = queries;