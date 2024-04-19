const { customAlphabet } = require('nanoid');

// Define the alphabet containing only numbers
const alphabet = '0123456789';

// Define the function to generate IDs
const genNumericId = customAlphabet(alphabet, 6);

module.exports = {
  genNumericId
}