import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';

const app = express();
var server = http.createServer(app);
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//Color log variables
import clog from './util/clog.js';

import { router } from './routes/index.js';
router(app);

server.listen(port);
clog.clog('Server started listening on ' + port + ' for requests.', clog.blue);
