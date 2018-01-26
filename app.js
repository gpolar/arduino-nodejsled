const express = require('express');
const bodyParser = require('body-parser');
const five = require('johnny-five');
const board = new five.Board({
  port: "/dev/ttyACM0"
});
var led;
const app = express();

board.on("ready", function(){
  console.log("Arduino ");
  led = new five.Led(13);
});

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.post('/', (req, res) => {
  try {
    if (req.body.ledon || req.body.ledoff) {
      if (req.body.ledon) led.on();
      if (req.body.ledoff) led.off();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      exec: false,
    });
  }
  res.status(200).json({
    exec: true,
  });
  console.log(JSON.stringify(req.body));
});


app.listen(3012, () => {
  console.log('Rodando na porta local: 3012');
});
