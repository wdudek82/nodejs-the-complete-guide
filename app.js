const path = require('path');
const express = require('express');

const app = express();


/**
 *
 * Database
 *
 */
const { mongoConnect } = require('./utils/mongodb-setup');


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
/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));


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
  });
