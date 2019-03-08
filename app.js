const path = require('path');
const express = require('express');

const app = express();


/* Database */
const { sequelize } = require('./utils/sequelize.js');
const Product = require('./models/product');
const User = require('./models/user');

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  }).catch(console.log);
});

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

User.hasMany(Product);


/* Templating Engine */
app.set('view engine', 'ejs');
app.set('views', 'views');


/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));


/* Routes */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/product');
const errorRoutes = require('./routes/error');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(productRoutes);
app.use(errorRoutes);


/* Synchronize DB and start application server */
sequelize
// .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ firstName: 'Max', lastName: 'SchwarzMuller', email: 'max@test.com' });
    }

    /* Server Settings */
    app.listen(3000);
  })
  .catch();
