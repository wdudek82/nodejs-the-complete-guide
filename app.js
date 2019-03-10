const path = require('path');
const express = require('express');

const app = express();


/**
 *
 * Database
 *
 */
const { mongoConnect } = require('./utils/mongodb-setup');
const User = require('./models/user');


/**
 *
 * Templating Engine
 *
 */
app.set('view engine', 'ejs');
app.set('views', 'views');


/**
 *
 * Middlewares
 *
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));
app.use((req, res, next) => {
  User.findById('5c8549ad925b6219a9682fd4')
    .then((user) => {
      let mainUser = user;
      if (!mainUser) {
        mainUser = new User('Max', 'Schwarzmuller', 'max@test.test');
        mainUser.save();
      }
      req.user = mainUser;
      next();
    })
    .catch((err) => new Error(err));
});


/**
 *
 * Routes
 *
 */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/product');
const errorRoutes = require('./routes/error');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(productRoutes);
app.use(errorRoutes);


/**
 *
 * Application Server
 *
 */
mongoConnect()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => new Error(err));
