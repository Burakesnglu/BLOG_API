require('dotenv').config()
var express = require('express'),
    app = express(),
    http = require('http'),
    https = require('https'),
    port = process.env.PORT || 7000,  //live: 7000, test: 7200
    mongoose = require('mongoose'),
    TestModels = require('./models/testModels'), //created model loading here 
    UserModels = require('./models/userModels'), //created model loading here 
    ApiModels = require('./models/apiModels'), //created model loading here 
    CommonModels = require('./models/commonModels'), //created model loading here 
    PostModels = require('./models/postModels'), //created model loading here 
    CommentModels = require('./models/commentModels'), //created model loading here 
    TagModels = require('./models/tagModels'), //created model loading here 
    bodyParser = require('body-parser');


const fs = require('fs');

var config = require("./config/config");
var cors = require('cors');
require('./models/enums');

require('dotenv').config();

//import enums
require('./models/enums.js')



// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false); //node:15992
mongoose.connect(config.connection_string, { useNewUrlParser: true }); //main local



//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:5173'],
    credentials: true
}));

app.use("/", require("./middlewares/saveRequest"));
app.use("/v1", require("./middlewares/verifyToken"));
app.use("/v1", require("./middlewares/verifySecurityCode"));
app.use("/admin", require("./middlewares/verifyToken"));
app.use("/admin", require("./middlewares/verifyAdmin"));
app.use("/public", require("./middlewares/verifySecurityCode"));
app.use("/auth", require("./middlewares/verifySecurityCode"));
app.set("api_secret_key", config.api_secret_key);


var userRoutes = require('./routes/userRoutes'); //importing route
userRoutes(app); //register the route 
var postRoutes = require('./routes/postRoutes'); //importing route
postRoutes(app); //register the route 
var publicRoutes = require('./routes/publicRoutes'); //importing route
publicRoutes(app); //register the route 
var apiRoutes = require('./routes/apiRoutes'); //importing route
apiRoutes(app); //register the route 
var fileRoutes = require('./routes/fileRoutes'); //importing route
fileRoutes(app); //register the route 

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});


app.listen(port, function () {
    console.log('CORS-enabled web server listening on port ' + port)
})
/*
const options = {
   key: fs.readFileSync('key.pem'),
   cert: fs.readFileSync('cert.pem')
};
*/
//http.createServer(app).listen(3005, 'localhost');
//https.createServer(options, app).listen(3006, 'serverName');

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


console.log('BLOG RESTful API server started on: ' + port);
// console.log("ENV", process.env);
