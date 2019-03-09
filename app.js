const path = require('path');
const express = require('express');

const app = express();


/**
 *
 * Database
 *
 */
const { sequelize } = require('./utils/sequelize.js');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

// Creating default user record and assigning it to the request object
app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  }).catch(console.log);
});

/* Product-User (ManyToOne) */
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

/* User-Product (OneToMany) */
User.hasMany(Product);

/* User-Cart (OneToOne) */
User.hasOne(Cart);
// Cart.belongsTo(User); // Same thing as User.hasOne(Cart)

/* Cart-Product (ManyToMany) */
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

/* User-Order OneToMany */
Order.belongsTo(User);
User.hasMany(Order);

/* Order-Product (ManyToMany) */
Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });


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
 * 1. Synchronize DB
 * 2. start application server
 *
 */
sequelize
// .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        firstName: 'Max',
        lastName: 'SchwarzMuller',
        email: 'max@test.com',
      });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    /* Server Settings */
    app.listen(3000);
  })
  .catch(console.log);
