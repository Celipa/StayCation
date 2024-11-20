const app = require('./app.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://AlvaDb:BytMig123@testdb.s0fjhfi.mongodb.net/NodeAPI"

//Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());



//Routes
app.get('/', (req, res) => {
    res.send('Hello Node API');
});
const userRoutes = require('./src/routes/userRoutes.js')
app.use('/users', userRoutes)
const propertyRoutes = require('./src/routes/propertyRoutes.js');
app.use('/properties', propertyRoutes);
const cityRoutes = require('./src/routes/cityRoutes.js');
app.use('/cities', cityRoutes);
const messageRoutes = require('./src/routes/messageRoutes.js');
app.use('/messages', messageRoutes);
const orderRoutes = require('./src/routes/orderRoutes.js');
app.use('/api/orders', orderRoutes);




 app.listen(PORT, () => console.log('Server is running on http://localhost:' + PORT))

 const connectDB = async () => {
     try {
         if(!MONGO_URI) throw new Error('MongoURI is missing')
         await mongoose.connect(MONGO_URI)
         console.log('Connected to MongoDB');        
     } catch (error) {
         console.error(error)
         process.exit(1)
     }
 }
 connectDB();

