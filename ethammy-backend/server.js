const express = require('express');
const app = express();
const port = 3000;

//Color log variables
const color = require('./exports/clog.js');
const clog = color.clog;

const profileRoute = require('./routes/profile.js');

app.post("/api/auth", (req, res) => profileRoute.loginAuth(req, res));
app.post("/api/register", (req, res) => profileRoute.register(req, res));

app.listen(port);
clog('Server started listening on '+port+' for requests.',color.blue);
