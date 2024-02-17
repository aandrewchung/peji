const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const { generateImage, saveImageInfo } = require('./utils/imagehandler');
const { extractPanels } = require('./utils/storytopanels');

require('dotenv').config(); // To use .env variables
const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Don't save session if unmodified
    saveUninitialized: true, // Save uninitialized session
    cookie: { secure: !process.env.DEVELOPMENT } // Use `secure: true` in production if using HTTPS
  }));



  
app.get('/', (req, res) => {
    res.send('Server is running');
});


app.post('/generate-image', async (req, res) => {
    const { text } = req.body; // Assuming the client sends the entire story text
    const sessionId = req.sessionID; // Get the session ID from the request session
    const story = text;

    try {
        const panels = await extractPanels(story); // Make sure to await here
        console.log(panels); // Debug: Log the output of extractPanels
        if (!Array.isArray(panels)) {
            throw new TypeError('Expected an array of panels');
        }


        const imageUrls = await Promise.all(panels.map(async (panel) => {
            const imageUrl = await generateImage(panel); // Generate an image for each panel
            await saveImageInfo({ sessionId, text: panel, imageUrl }); // Save each panel's info
            return imageUrl; // Return the URL for inclusion in the response
        }));

        res.json({ imageUrls }); // Send back an array of image URLs
    } catch (error) {
        console.error('Error processing story panels:', error);
        res.status(500).send('Server error');
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
