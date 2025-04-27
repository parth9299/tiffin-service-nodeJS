
const express = require('express');
const sequelize = require('./config/database');
const cors =  require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const appRouter = require('./app-routes')
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 

app.use(bodyParser.json());
app.use(cors({
   origin : '*',
}));
appRouter.appRoutes(app);


sequelize.sync()
.then(()=>{
   console.log('Database Connected Successfully');
}).catch((err)=>{
   console.log('Dataabse Connection Error',err);
});

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`);
});

