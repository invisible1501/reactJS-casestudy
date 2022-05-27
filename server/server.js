const express = require('express');
const app = express();
const path = require("path");
const jsonServer = require('json-server');
const apiRouter = require('./routes/routes-api.js');
const productDetailRouter = require('./routes/routes-product-detail.js');

//const bodyParser = require('body-parser');
//const apiMocker = require('connect-api-mocker');
var cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(jsonServer.bodyParser);
app.use(express.static(path.join(__dirname, '../client/build')));  // THIS LINE IS USED FOR DEPLOYING AND I'M NOT REALLY UNDERSTAND WHY
app.use(cors({
    origin: '*'
}));
app.use('/api', apiRouter);
app.use('/detail', productDetailRouter);
//require('./routes/routes-user.js')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

//app.use('/api/users', signRouter);

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Server is now running on port ${PORT}`);
});