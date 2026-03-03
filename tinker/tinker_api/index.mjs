import express, {json, urlencoded} from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from "mongoose";

const mongoString = process.env.DB_URI;
connect(mongoString).then(()=>{
  console.log("Connected to the database.");
}).catch((err)=>{
  console.log("Cannot connect to the database!", err.message);
  throw new Error(err.message);
});

const app = express();
const port = process.env.APP_PORT;
app.use(json({limit: '50mb'}));
app.use(urlencoded({limit: '50mb'}));
app.use(cors());

app.get('/', (req, res) => {
  res.send({ 'app_name': process.env.APP_NAME });
});

import login from './controller/main/login.mjs'; login(app);

/* Configuration */
import user from './controller/config/user.mjs'; user(app);
import role from './controller/config/role.mjs'; role(app);
// [TINKER:CTRL:config]

/* Master */
import branch from './controller/master/branch.mjs'; branch(app);
// [TINKER:CTRL:master]

/* Transaction */
// [TINKER:CTRL:transaction]

/* Reporting */
// import report from './controller/report/revenue.mjs'; report(app);
// [TINKER:CTRL:report]
// [TINKER:CTRL:END]

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});