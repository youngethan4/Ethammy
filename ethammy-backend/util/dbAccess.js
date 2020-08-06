//Database connection info
import { connection } from "./dbConnect.js";
import mysql from "mysql";
const pool = mysql.createPool(connection);

//Color log variables
import clog from "./clog.js";

export const query = (sql) => {
  return new Promise((resolve) => {
    try {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(JSON.parse(JSON.stringify(result)));
      });
    } catch(err){
      throw err;
    }
  });
}