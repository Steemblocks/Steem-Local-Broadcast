const steem = require('steem');
const config = require('./config'); // Import the configuration

// Set a working Steem API endpoint
steem.api.setOptions({ url: 'https://api.steemit.com' });

// Use the username and active key from the configuration
const username = config.username;
const activeKey = config.activeKey;

// Function to fetch the current STEEM to VESTS conversion rate
async function getSteemToVestsConversionRate() {
    return new Promise((resolve, reject) => {
        steem.api.getDynamicGlobalProperties((err, result) => {
            if (err) {
                reject(err);
            } else {
                const totalVestingFund = parseFloat(result.total_vesting_fund_steem.split(' ')[0]);
                const totalVestingShares = parseFloat(result.total_vesting_shares.split(' ')[0]);
                const conversionRate = totalVestingShares / totalVestingFund;
                resolve(conversionRate);
            }
        });
    });
}

// Function to convert STEEM to VESTS
function convertSteemToVests(steemAmount, conversionRate) {
    const vests = steemAmount * conversionRate;
    return vests.toFixed(6) + ' VESTS'; // Format to 6 decimal places
}

// Function to broadcast a transaction
async function broadcastTransaction(operation) {
    return new Promise((resolve, reject) => {
        steem.broadcast.send(
            { operations: [operation], extensions: [] },
            { active: activeKey }, // Use the active key here
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

// Function to return vesting delegation from a specific account
async function returnVestingDelegation(delegatee, steemAmount) {
    try {
        // Get the STEEM to VESTS conversion rate
        const conversionRate = await getSteemToVestsConversionRate();

        // Convert STEEM to VESTS
        const vestingShares = convertSteemToVests(steemAmount, conversionRate);

        // Construct the return delegation operation
        const operation = [
            'delegate_vesting_shares', // Use delegate_vesting_shares to return delegation
            {
                delegator: username, // Your account
                delegatee: delegatee, // The account you delegated to
                vesting_shares: vestingShares, // Amount of VESTS to return
            },
        ];

        // Broadcast the transaction
        const result = await broadcastTransaction(operation);
        return result;
    } catch (error) {
        throw error;
    }
}

// Example usage with command-line arguments
const delegatee = process.argv[2]; // Delegatee username (e.g., "acidyo", "infovore", "promoted", "spaminator", "steemcleaners")
const steemAmount = parseFloat(process.argv[3]); // Set the Amount of STEEM to 0.00 to canecl the delegation

if (!delegatee || isNaN(steemAmount)) {
    console.error('Usage: node steemReturnDelegation.js <delegatee> <steemAmount>');
    process.exit(1);
}

(async () => {
    try {
        const result = await returnVestingDelegation(delegatee, steemAmount);
        console.log('Return Vesting Delegation Transaction:', result);
    } catch (error) {
        console.error('Error:', error);
    }
})();
