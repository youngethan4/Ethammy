//Database connection info
import { connection } from "./dbConnect.js";
import mysql from "mysql";
export const pool = mysql.createPool(connection);

//Color log variables
import clog from "./clog.js";

export const query = (sql) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(sql, (err, result, rows) => {
        if (err) {
          return reject(err);
        }
        console.log(result);
        return resolve(JSON.parse(JSON.stringify(result)));
      });
    } catch (err) {
      throw err;
    }
  });
};
