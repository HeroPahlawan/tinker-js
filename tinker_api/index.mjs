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

/* Master */
import branches from './controller/master/branches.mjs'; branches(app);
import company from './controller/master/company.mjs'; company(app);
import employee from './controller/master/employee.mjs'; employee(app);
import promotions from './controller/master/promotions.mjs'; promotions(app);
import categories from './controller/master/categories.mjs'; categories(app);

/* Transaction */
import transaction from './controller/transaction/inventory.mjs'; transaction(app);
import catalogue from './controller/main/catalogue.mjs'; catalogue(app);
import product from './controller/transaction/product.mjs'; product(app);
import checkout from './controller/transaction/checkout.mjs'; checkout(app);
import purchases from './controller/transaction/purchases.mjs'; purchases(app);


/* Reporting */
// import report from './controller/report/revenue.mjs'; report(app);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});