//Database connection info
import { dbConnection } from './dbConnect';
const con = dbConnection.connect();

//Color log variables
const color = require('./clog.js');
const clog = color.clog;

const dbInsert = (table, columns, values) => {
  var sql = "INSERT INTO " + table + "(" + columns.toString(", ") + ") VALUES (" + values.toString(", ") + ")";
  con.query(sql, (err, result) => {
    if (err) throw err;
    return (result);
    clog('1 record inserted into' + table, color.green);
  });
}

const dbSelect = (table, columns, condition) => {
  var sql = "SELECT " + columns.toString(", ") + " FROM " + table + " WHERE " + condition;
  con.query(sql, (err, result) => {
    if (err)
      throw err;
    return result;
  });
}

const dbDelete = (table, condition) => {
  var sql = "DELETE FROM " + table + " WHERE " + condition;
  con.query(sql, (err, result) => {
    if (err)
      throw err;
    clog('Number of records deleted: ' + result.affectedRows, color.green);
  });
}

const dbUpdate = (table, setStatement, condition) => {
  var sql = "UPDATE " + table + " SET " + setStatement + " WHERE " + condition;
  con.query(sql, (err, result) => {
    if (err)
      throw err;
    clog(result.affectedRows + ' record(s) updated', color.green);
  });
}

module.exports = {
  dbInsert,
  dbSelect,
  dbDelete,
  dbUpdate
};