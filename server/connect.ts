import mysql from 'mysql'
import dotenv from 'dotenv';

dotenv.config();

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