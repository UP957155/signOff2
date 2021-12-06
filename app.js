const express = require('express');
const api = require('./api/api')
const app = express();

//use api express router
app.use(api);
//use 'static' folder and its html files
app.use(express.static('static', { extensions: ['html'] }));

//define port
const port = process.env.PORT || 8080;

//run app on port
app.listen(port, (err) => {
  if (err) console.log('error', err);
  else console.log(`app listening on port ${port}`);
});