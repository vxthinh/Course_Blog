const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const app = express();
const port = 3000;


const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db');


//Connect to DB
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middlewaves
app.use(SortMiddleware);
//HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: require('./helper/handlebars')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));



// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
