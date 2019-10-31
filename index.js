const express = require('express')
const bodyParser = require('body-parser'); 
let app = express();
let db = require('./database/connection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) // middleware




const expressHbs = require('express-handlebars');

app.use(express.static(__dirname + '/public/'));

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main',
      extname: 'hbs',   })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');
  
app.get('/', function(req, res){
    res.render('game', {tileCount: '3', col: '5', row:'5'})
})



let userRouter = require('/router/userRouter');

app.use(userRouter);

app.listen(3000, () => console.log('Server ready'))
