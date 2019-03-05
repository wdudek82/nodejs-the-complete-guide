const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const rootDir = require('./util/path');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .sendFile(
      path.resolve('views', '404.html')
    );
});

app.listen(3000);
