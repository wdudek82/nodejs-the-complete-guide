const path = require('path');
const express = require('express');

const app = express();

/**
 *
 * Database
 *
 */
const { mongooseSetup } = require('./utils/mongoose-setup');
const { User } = require('./models/user');

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
  User.findOne()
    .then((user) => {
      if (!user) {
        console.log('No user found! Creating new one');
        const newUser = new User({
          _id: '5c86a91dee3f755886152cd5',
          firstName: 'Max',
          lastName: 'Schwarzmuller',
          email: 'max@test.com',
          cart: { items: [] },
        });
        return newUser.save();
      }
      return user;
    })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
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

mongooseSetup()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => new Error(err));
