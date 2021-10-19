const { customAlphabet } = require('nanoid');

const alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';

export default customAlphabet(alphabet, 16);
