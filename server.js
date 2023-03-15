const express = require('express');

const app = express();

app.use((req, res, next) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.get('host')}${req.url}`);
  } else {
    next();
  }
});

app.use(express.static('public', { extensions: ['html'] }));

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`server started ${port}`);
