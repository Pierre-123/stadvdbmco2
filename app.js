const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv')
dotenv.config()

const app = express();

const dbService = require('./conn/dbService')

app.use(express.static(__dirname + '/public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended:true }));


//Routes
const introRoute = require('./routes/intro');
const isolationRoute = require('./routes/isolation')
const luzonRoute = require('./routes/luzon');
const visminRoute = require('./routes/vismin');
const reportRoute = require('./routes/report');

//Routes - Pages
app.use('/',        introRoute);
app.use('/isolation', isolationRoute)
app.use('/luzon',   luzonRoute);
app.use('/vismin', visminRoute);
app.use('/report', reportRoute);
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs")
app.set("views", "./views")

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Server listening on port ${port}`)});


app.use((req,res,next)=>{
  console.log(`${req.method}:${req.url}`)
  next();
})

