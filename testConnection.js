const steem = require('steem');
const config = require('./config');
const { tryWithNodeFailover } = require('./nodeUtils');

// Set initial node from config
steem.api.setOptions({ url: config.nodes[config.currentNodeIndex] });

// Test the connection with failover support
async function testConnection() {
    try {
        await tryWithNodeFailover(() => {
            return new Promise((resolve, reject) => {
                steem.api.getDynamicGlobalProperties((err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(`Connected to Steem API (${config.nodes[config.currentNodeIndex]}):`);
                        console.log(result);
                        resolve(result);
                    }
                });
            });
        });
    } catch (error) {
        console.error('Error connecting to all Steem API nodes:', error);
    }
}

// Run the test
testConnection();
