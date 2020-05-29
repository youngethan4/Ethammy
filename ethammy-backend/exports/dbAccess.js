//Database connection info
const dbConnection = require("./dbConnection.js");
const con = dbConnection.connection;

//Color log variables
const color = require('./clog.js');
const clog = color.clog;

const sqlInsert = function(table, columns, values){
  con.connect((err) => {
    if(err)
      throw err;
    var sql = "INSERT INTO " + table + "(" +columns.toString(", ")+") VALUES (" + values.toString(", ") + ")";
    con.query(sql, (err, result) => {
      if(err)
        throw err;
      clog('1 record inserted into' + table, color.green);
    });
  });
}

const sqlSelect = function(table, columns, condition){
  con.connect((err) => {
    if(err)
      throw err;
    var sql = "SELECT "+ columns.toString(", ") + " FROM " + table + " WHERE " + condition;
    con.query(sql, (err, result) => {
      if(err)
        throw err;
      return result;
    });
  });
}

const sqlDelete = function(table, condition){
  con.connect((err) => {
    if(err)
      throw err;
    var sql = "DELETE FROM " + table + " WHERE " + condition;
    con.query(sql, (err, result) => {
      if(err)
        throw err;
      clog('Number of records deleted: ' + result.affectedRows, color.green);
    });
  });
}

const sqlUpdate = function(table, setStatement, condition){
  con.connect((err) => {
    if(err)
      throw err;
    var sql = "UPDATE " + table + " SET " + setStatement + " WHERE " + condition;
    con.query(sql, (err, result) => {
      if(err)
        throw err;
      clog(result.affectedRows + ' record(s) updated', color.green);
    });
  })
}

module.exports = {
  dbInsert : sqlInsert,
  dbSelect : sqlSelect,
  dbDelete : sqlDelete,
  dbUpdate : sqlUpdate
};
