const path = require('path');
const express = require('express');

const app = express();

/* Templating Engine */
app.set('view engine', 'ejs');
app.set('views', 'views');

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

/* Routes */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/error');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

/* Server Settings */
app.listen(3000);
