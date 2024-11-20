import express, { Request, Response } from 'express';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://AlvaDb:BytMig123/testdb.s0fjhfi.mongodb.net/NodeAPI";

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

const userRoutes = require('./routes/userRoutes').default;
app.use('/users', userRoutes);

const propertyRoutes = require('./routes/propertyRoutes').default;
app.use('/api/properties', propertyRoutes);

const cityRoutes = require('./routes/cityRoutes').default;
app.use('/api/cities', cityRoutes);

const messageRoutes = require('./routes/messageRoutes').default;
app.use('/messages', messageRoutes);

const orderRoutes = require('./routes/orderRoutes').default;
app.use('/api/orders', orderRoutes);

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error: unknown) => {
    if (error instanceof Error) {
        console.error('Error connecting to MongoDB:', error.message);
    } else {
        console.error('Error connecting to MongoDB:', error);
    }
});