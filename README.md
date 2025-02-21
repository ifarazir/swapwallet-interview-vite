
# SwapWallet Interview Vite Project

This project is a simple token swap application built with React and Vite. It allows users to swap between different tokens and updates the token balances accordingly.

## Features

- Fetches token data from an fake external API.
- Allows users to select source and destination tokens.
- Calculates the swap amount based on token prices.
- Updates token balances and stores them in localStorage.
- Displays the updated token balances.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ifarazir/swapwallet-interview-vite.git
    ```

2. Navigate to the project directory:

    ```bash
    cd swapwallet-interview-vite
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Components

### `SwapCard`

This component allows users to select source and destination tokens, enter the amount to swap, and perform the swap.

### `SwapInput`

This component is used within `SwapCard` to handle token selection and amount input.

## Hooks

### `useTokens`

This hook fetches token data from an external API and manages the token state. It also handles storing and retrieving token data from localStorage.

## Types

### `Token`

Represents a token with its name, available balance, and market data.

### `Amount`

Represents an amount with a number and unit.

### `MarketDataInfo`

Represents market data information including best buy, best sell, latest price, and day change.

### `MarketData`

Represents market data for a token including source, destination, and market data information.

## License

This project is licensed under the MIT License.
