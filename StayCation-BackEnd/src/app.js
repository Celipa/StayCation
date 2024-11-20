const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api', propertyRoutes);
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api', bookingRoutes);
// const orderRoutes = require('./routes/orderRoutes');
// app.use('/api', orderRoutes);
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);
const cityRoutes = require('./routes/cityRoutes');
app.use('/api', cityRoutes);

module.exports = app;

// const express = require('express')
// const cors = require('cors')
// const app = express()

// app.use(cors())

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))



// //routes
// const userRoutes = require('./routes/userRoutes')
// app.use('/api', userRoutes)
// const productRoutes = require('./routes/productRoutes');
// app.use('/api', productRoutes);
// const propertyRoutes = require('./routes/propertyRoutes');
// app.use('/api', propertyRoutes);
// const bookingRoutes = require('./routes/bookingRoutes')
// app.use('/api', bookingRoutes)
// const orderRoutes = require('./routes/orderRoutes')
// app.use('/api', orderRoutes)
// const messageRoutes = require('./routes/messageRoutes');
// app.use('/api', messageRoutes);
// const cityRoutes = require('./routes/cityRoutes');
// app.use('/api', cityRoutes);

// module.exports = app;