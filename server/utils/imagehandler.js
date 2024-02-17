const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Ensure your API key is set as an environment variable
});

// Renamed main to generateImage and added prompt parameter
async function generateImage(prompt) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1, // Number of images to generate
            size: "1792x1024" // Specify the size of the image
        });

        console.log(response.data); // Log the response data to see the output
        
        // Assuming the URL is directly accessible or within a property of response.data
        // You might need to adjust the path according to the actual response structure
        const imageUrl = response.data[0].url; // Access the first element's url property
        console.log(imageUrl);
        // const savePath = path.join(__dirname, '../images/background/background.jpg');
        // downloadImage(imageUrl, savePath);
        return imageUrl;
    } catch (error) {
        console.error("Error generating image:", error);
    }
}

// Example command-line usage: node script.js "A cute baby sea otter"
// Alternatively, call generateImage directly with a prompt
// const customPrompt = "A beautiful sunset on the beach";
// generateImage(customPrompt);

// Assuming this is in a file like /server/services/imageHandler.js
// Adjust the path according to your project structure

const Image = require('../models/image'); // Adjust the path as necessary

async function saveImageInfo(imageData) {
    try {
        const newImage = new Image(imageData);
        await newImage.save();
        console.log('Image info saved to MongoDB:', newImage);
        return newImage;
    } catch (error) {
        console.error('Error saving image info to MongoDB:', error);
        throw error; // Rethrow or handle as needed
    }
}

module.exports = { generateImage, saveImageInfo };
