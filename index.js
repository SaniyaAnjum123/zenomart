const express = require("express");
const dotEnv = require('dotenv');
dotEnv.config(); // ✅ Load environment variables first

const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());

mongoose.connect(process.env.MONGO_URL) // ✅ Fixed: changed from MONGO_URI to MONGO_URL
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error));

app.use(bodyParser.json());
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("<h1> Welcome to SUBY</h1>");
});
