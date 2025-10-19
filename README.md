# Steem Blockchain Local Broadcast JavaScript Tools

This project provides JavaScript scripts to interact with the Steem blockchain. It includes tools for delegating and returning vesting shares, using the `steem-js` library with multi-node failover support.

## Features

- **Delegation**: Delegate STEEM Power (VESTS) to other accounts
- **Return Delegation**: Return delegated STEEM Power (VESTS) from other accounts
- **Easy Input**: Specify amounts in STEEM instead of VESTS for user convenience
- **Multi-Node Support**: Automatic failover between multiple Steem nodes
- **Connection Testing**: Test connectivity to Steem nodes with detailed information

## Prerequisites

Before running the scripts, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- VS Code

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Steemblocks/Steem-Local-Broadcast.git
   cd Steem-Local-Broadcast
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Edit the `config.js` file and add your Steem account details and preferred nodes:

   ```javascript
   module.exports = {
       username: 'your-userid', // Replace with your Steem username
       activeKey: 'your-active-key', // Replace with your active private key
       nodes: [
           'https://api.steemit.com',
           'https://api.moecki.online',
           'https://steemd.steemworld.org',
           'https://api.steemitdev.com'
       ],
       currentNodeIndex: 0 // Index of the initially selected node
   };
   ```

   Replace `your-username` and `your-active-key` with your Steem account credentials. The nodes list can be modified according to your preferences.

## Usage

### Test Node Connection

Before performing any operations, you can test the connection to the Steem nodes:

```bash
node testConnection.js
```

This will:
- Connect to the first available node
- Display detailed blockchain information
- Automatically switch to alternative nodes if the current one fails

### Delegate STEEM Power 

To delegate STEEM Power to another account, use the `steemDelegate.js` script:

```bash
node steemDelegate.js <delegatee> <steemAmount>
```

- `<delegatee>`: The account you want to delegate to
- `<steemAmount>`: The amount of STEEM to delegate

**Example**:

```bash
node steemDelegate.js "the-gorilla" 1000
```

This delegates **1000 STEEM** worth of VESTS to the account `the-gorilla`. If the current node fails, the script will automatically try other available nodes.

### Return Delegated STEEM Power

To return delegated STEEM Power from another account, use the `cancelDelegation.js` script:

```bash
node cancelDelegation.js <delegatee> <steemAmount>
```

- `<delegatee>`: The account you want to return delegation from
- `<steemAmount>`: The amount of STEEM to return

**Example**:

```bash
node cancelDelegation.js "avro33" 0.00
```

This returns all STEEM delegation from the account `avro33`. After canceling, you can delegate again using `steemDelegate.js` with your desired amount.

### Node Failover

All scripts include automatic node failover:
- If the primary node fails, the system automatically switches to the next available node
- The operation is retried on the new node without user intervention
- The process continues until a working node is found or all nodes have been tried


---

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Acknowledgments

- [steem-js](https://github.com/steemit/steem-js): The JavaScript library for interacting with the Steem blockchain.
- [Steem Developers](https://developers.steem.io/): Official Steem developer documentation.

---

## Support

If you have any questions or need help, feel free to open an issue or contact the maintainers.
https://steemit.com/@dhaka.witness
