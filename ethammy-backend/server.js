import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
var server = require('http').createServer(app);
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//Color log variables
import { clog as _clog, blue } from './exports/clog.js';
const clog = _clog;

import { router } from './routes';
router(app);

server.listen(port);
clog('Server started listening on ' + port + ' for requests.', blue);
