const app = require('./app.js');
const express = require('express');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://AlvaDb:BytMig123@testdb.s0fjhfi.mongodb.net/NodeAPI"

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Routes
app.get('/', (req, res) => {
    res.send('Hello Node API');
});
const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/properties', propertyRoutes);
const bookingRoutes = require('./routes/bookingRoutes')
app.use('/bookings', bookingRoutes)
const cityRoutes = require('./routes/cityRoutes');
app.use('/cities', cityRoutes);
// const productRoutes = require('./routes/productRoutes');
// app.use('/products', productRoutes);
// const orderRoutes = require('./routes/orderRoutes')
// app.use('/orders', orderRoutes)
const messageRoutes = require('./routes/messageRoutes');
app.use('/messages', messageRoutes);




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

