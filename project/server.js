require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');
const AuthRoute=require('./routes/auth');
const authController=require('./controllers/registerController')
const loginController=require('./controllers/loginController')

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});
app.use('/', loginController);
app.use('/login', loginController);
app.use('/register', authController);
app.use('/employee', employeeController);
app.use('/api', AuthRoute);