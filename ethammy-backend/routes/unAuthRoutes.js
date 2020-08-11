import express from "express";
import Account from "../controllers/account.controller.js";
export const unAuth =  express.Router();

unAuth.post("/auth", Account.login).post("/register", Account.register);
