import { query } from "../util/dbAccess.js";

const usersTable = "users";

const checkEmail = async (email) => {
  const sql = `SELECT COUNT(email) FROM ${usersTable} WHERE email = '${email}'`;
  try {
    return await query(sql);
  } catch (err) {
    throw err;
  }
};

const getMatchingUsernameDiscriminators = async (username) => {
  const sql = `SELECT discriminator FROM ${usersTable} WHERE username = '${username}'`;
  try {
    return await query(sql);
  } catch (err) {
    throw err;
  }
};

const addUser = async (body, discriminator) => {
  const name = body.name;
  const username = body.username;
  const email = body.email;
  const password = body.password;
  const date = new Date();
  const joined = date.toISOString().slice(0, 19).replace('T', ' ');
  console.log(joined);
  const sql =
    `INSERT INTO ${usersTable} (name, username, email, password, discriminator, timeJoined) ` +
    `VALUES ('${name}', '${username}', '${email}', '${password}', ${discriminator}, '${joined}')`;
  try {
    return await query(sql);
  } catch (err) {
    throw err;
  }
};

const checkUserLogin = async (body) => {
  const email = body.email;
  const password = body.password;
  const sql =
    `SELECT id, name, username, email FROM ${usersTable} ` +
    `WHERE email = '${email}' AND password = '${password}'`;
  try {
    return await query(sql);
  } catch (err) {
    throw err;
  }
};

const updateUser = async (body) => {
  try {
    return await query(sql);
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM ${usersTable} WHERE id = ${id}`;
  try {
    return await query(sql);
  } catch (err) {
    throw err;
  }
};

export default {
  checkEmail,
  getMatchingUsernameDiscriminators,
  addUser,
  checkUserLogin,
  updateUser,
  deleteUser,
};
