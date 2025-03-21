# Steem Blockchain Local Broadcast JavaScript Tools

This project provides JavaScript scripts to interact with the Steem blockchain. It includes tools for delegating and returning vesting shares, using the `steem-js` library.

## Features

- **Delegation**: Delegate STEEM Power (VESTS) to other accounts.
- **Return Delegation**: Return delegated STEEM Power (VESTS) from other accounts.
- **Easy Input**: Specify amounts in STEEM instead of VESTS for user convenience.

## Prerequisites

Before running the scripts, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Visual Code Studio

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

3. Edit the `config.js` file and add your Steem account details:

   ```
   username: 'your-userid', // Replace with your Steem username
   activeKey: 'your-active-key', // Replace with your active private key
   ```

   Replace `your-username` and `your-active-key` with your Steem account credentials.

## Usage

### Delegate STEEM Power 

To delegate STEEM Power to another account, use the `steemDelegate.js` script:

```bash
node steemDelegate.js <delegatee> <steemAmount>
```

- `<delegatee>`: The account you want to delegate to.
- `<steemAmount>`: The amount of STEEM to delegate.

**Example**:

```bash
node steemDelegate.js "dhaka.witness" 1000
```

This delegates **1000 STEEM** worth of VESTS to the account `dhaka.witness`.

---

### Return Delegated STEEM Power

To return delegated STEEM Power from another account, use the `cancelDelegation.js` script:

```bash
node steemReturnDelegation.js <delegatee> <steemAmount>
```

- `<delegatee>`: The account you want to return delegation from.
- `<steemAmount>`: The amount of STEEM to return.

**Example**:

```bash
node steemReturnDelegation.js "avro33" 0.00
```

This returns All the STEEM delegation from the account `avro33`. Then you can delegate again using **steemDelegation.js** your desired amount to the accounts. 


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
