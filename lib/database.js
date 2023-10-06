"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const con = (0, promise_1.createPool)({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
async function query(sql, values) {
    const [rows] = await con.query(sql, values);
    return rows;
}
exports.query = query;
query("SELECT * FROM users", []).then((rows) => {
    console.log(rows);
});
