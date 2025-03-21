const steem = require('steem');

// Set a working Steem API endpoint
steem.api.setOptions({ url: 'https://api.steemit.com' });

// Test the connection
steem.api.getDynamicGlobalProperties((err, result) => {
    if (err) {
        console.error('Error connecting to Steem API:', err);
    } else {
        console.log('Connected to Steem API:', result);
    }
});