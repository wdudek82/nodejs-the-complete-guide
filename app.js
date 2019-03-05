const path = require('path');
const express = require('express');

const app = express();
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(
      path.resolve('views', '404.html')
    );
});

app.listen(3000);
