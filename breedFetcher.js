const needle = require('needle');

// Define the API URL for cat breeds
const API_URL = 'https://api.thecatapi.com/v1/breeds/search';

// Get the breed name from command-line arguments
const breedName = process.argv[2];

if (!breedName) {
  console.error('Please provide a breed name as a command-line argument.');
  process.exit(1);
}

// Fetch the data
needle.get(API_URL, (error, response, body) => {
  if (error) {
    console.error('Error fetching data. Please check your internet connection or try again later.');
    console.error('Error details:', error.message);
    return;
  }

  // Check if the body is an array
  if (Array.isArray(body)) {
    // Find the breed specified by the user
    const breed = body.find(b => b.name.toLowerCase() === breedName.toLowerCase());
    if (breed) {
      console.log(`Description for ${breed.name}: ${breed.description}`);
    } else {
      console.log(`Breed "${breedName}" not found. Please check the name and try again.`);
    }
  } else {
    console.error('Unexpected API response format:', body);
  }
});
