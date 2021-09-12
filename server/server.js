const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const restaurantRoutes = require('./routes/restaurants');

// app.use('/api', (req, res) => res.send('API Working fine!'));
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});