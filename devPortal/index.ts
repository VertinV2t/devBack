import { mainRoutes } from "./routes/routes";
import bodyParser  from "body-parser";
const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}))
// Define a route for the homepage
app.use(bodyParser.json())
app.use('/', mainRoutes)
// Start the server
app.listen(3000, () => {
  console.log('Express server running at <http://127.0.0.1:3000/>');
});
