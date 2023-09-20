const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.listen(port, host, () => console.log(`http://${host}:${port}`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// NOTE: In a production environment using real data, this secret 
// key would be stored in a secure configuration file or environment variable.
// However, since this is a demo and not intended for actual deployment, 
// the key is included here for simplicity.
app.use(session({
  secret: 'verySecretCode', 
  resave: false,
  saveUninitialized: true,
}));

// Setup handlebars view engine with custom helper so that the header will 
// always have the highlight on the correct tab.
const hbs = handlebars.create({
  defaultLayout: 'main',
  helpers: {
    ifActiveTab: function (currentTab, expectedTab) {
      return currentTab === expectedTab ? 'active' : '';
    },
  },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// static resources
app.use('/assets', express.static('assets'));


// Routing
var routes = require('./routes/routes.js');
app.use('/mossletters', routes);

// When status 404 is sent, use the 404 template. 
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});
