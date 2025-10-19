const steem = require('steem');
const config = require('./config');

// Function to switch to the next available node
function switchToNextNode() {
    config.currentNodeIndex = (config.currentNodeIndex + 1) % config.nodes.length;
    const newNode = config.nodes[config.currentNodeIndex];
    steem.api.setOptions({ url: newNode });
    console.log(`Switched to node: ${newNode}`);
    return newNode;
}

// Function to try an operation with node failover
async function tryWithNodeFailover(operation) {
    const maxRetries = config.nodes.length;
    let retries = 0;
    
    while (retries < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            console.error(`Error with current node: ${error.message}`);
            retries++;
            
            if (retries < maxRetries) {
                switchToNextNode();
            } else {
                throw new Error('All nodes failed to respond');
            }
        }
    }
}

module.exports = {
    switchToNextNode,
    tryWithNodeFailover
};
