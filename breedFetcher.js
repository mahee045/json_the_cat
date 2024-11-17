const needle = require('needle');

const API_URL = 'https://api.thecatapi.com/v1/breeds/search';

// Function to fetch the breed description
const fetchBreedDescription = function(breedName, callback) {
  if (!breedName) {
    callback('Please provide a breed name as an argument.', null);
    return;
  }

  // Fetch the breed data
  needle.get(`${API_URL}?q=${breedName}`, (error, response, body) => {
    if (error) {
      callback(`Error fetching data: ${error.message}`, null);
      return;
    }

    // Check if the body contains data
    if (Array.isArray(body) && body.length > 0) {
      const breed = body[0]; // The API returns an array, take the first match
      callback(null, breed.description);
    } else {
      callback(`Breed "${breedName}" not found.`, null);
    }
  });
};

module.exports = { fetchBreedDescription };
