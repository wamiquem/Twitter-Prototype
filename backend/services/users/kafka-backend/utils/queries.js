const con = require('../../kafka-backend/mysql_connection');

var queries = {};

queries.createUser = (user, hash, successcb, failurecb) => {
    let sql = "INSERT INTO users (email, password, fname, lname, username, image) VALUES ?";
    const values = [user.email, hash, user.firstName, user.lastName, user.userName, user.imgUrl]
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.authenticateUser = (id, successcb, failurecb) => {
    let sql = 'SELECT * FROM users WHERE id = ?';
    con.query(sql, [id], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getUserPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password, username, id FROM users WHERE email = ?';
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
    let sql = `SELECT fname, lname, phone, email, username, bio, city, state, zip
    FROM users WHERE id = ?`;

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.updateUserProfile = (id, user, successcb, failurecb) => {
    let sql = `UPDATE users 
    SET fname =?, lname =?, phone = ?, username = ?, bio = ?, city = ?, state = ?, zip = ?, image = ?
    WHERE id = ?`;
    let values = [user.fname, user.lname, user.phone, user.username, user.bio, 
        user.city, user.state, user.zip, user.imageUrl, id];
    
    con.query(sql, values, function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

// queries.updateUserImage = (user, successcb, failurecb) => {
//     let sql = `UPDATE users 
//     SET image = ?
//     WHERE id = ?`;
//     let values = [user.image, user.id];
//     con.query(sql, values, function (err, result){
//         if (err){
//             failurecb(err);
//             return;
//         }
//         successcb(result);
//     });
// }

module.exports = queries;