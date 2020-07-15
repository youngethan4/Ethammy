import express from 'express';
import Account from '../controllers/account.controller';
const unAuth = express.Router();

unAuth
    .post('/auth', Account.login)
    .post('register', Account.register)