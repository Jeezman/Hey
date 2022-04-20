import mysql from 'mysql'

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database: process.env.DB
})

connection.connect(function (err) {
    if (err) {
        return console.error('error: ', + err.message);
    }

    console.log('Connected to the MYSQL server')
})


export default connection;


let createUser = `create table if not exists user(
    user_id int primary key auto_increment,
    username varchar(255) not null,
    constraint uc_user_username unique(username)
)
;`

let createCollection = `create table if not exists collection(
    collection_id int primary key auto_increment,
    user_id int,
    amount decimal(19,4),
    img_url varchar(255),
    description varchar(255),
    invoice_hash varchar(255),
    invoice_pay_req varchar(1000),
    invoice_expiry timestamp,
    invoice_settled boolean,
    foreign key (user_id) references user(user_id)
)`

connection.query(createUser, function (err, results, fields) {
    if (err) {
        console.log(err.message)
    }
    console.log('User table created')
})

connection.query(createCollection, function (err, results, fields) {
    if (err) {
        console.log(err.message)
    }
    console.log('Collection table created')
})

// let sql = `INSERT INTO user(username) VALUES('jeezman')`

// connection.query(sql, function (err, results, fields) {
//     if (err) { console.log(err.message) }
//     console.log("user inserted")
// })

// let stmt = `INSERT INTO user(username)
//             VALUES(?)`;
// let todo = ['Sarah'];

// connection.query(stmt, todo, (err, results, fields) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     // get inserted id
//     console.log('Todo Id:' + results.insertId);
// });

// let sql = `INSERT INTO collection(amount, img_url, description) VALUES(?,?,?)`;
// let collection = ['400', 'image url from google', 'In paradise'];
// connection.query(sql, collection, (err, results, fields) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     // get inserted id
//     console.log('collection Id:' + results.insertId);
// });

// connection.end(function (err) {
//     if (err) {
//         return console.log('error:' + err.message);
//     }
//     console.log('Close the database connection.');
// });


// insert multiple rows
/**
let stmt = `INSERT INTO todos(title,completed)  VALUES ?  `;
let todos = [
    ['Insert multiple rows at a time', false],
    ['It should work perfectly', true]
];

// execute the insert statment
connection.query(stmt, [todos], (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    // get inserted rows
    console.log('Row inserted:' + results.affectedRows);
});
 */