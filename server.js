
const express = require('express');
const sequelize = require('./config/database');
const cors =  require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const appRouter = require('./app-routes')
const path = require('path');
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 

app.use(bodyParser.json());
app.use(cors({
   origin : '*',
}));
appRouter.appRoutes(app);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
sequelize.sync()
.then(()=>{
   console.log('Database Connected Successfully');
}).catch((err)=>{
   console.log('Dataabse Connection Error',err);
});

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`);
});

