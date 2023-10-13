export const minimumSwapOutAbi = [{
    "inputs": [],
    "name": "WBTC",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [{
        "internalType": "address",
        "name": "strategyAddress",
        "type": "address"
    },
    {
        "internalType": "address",
        "name": "inputToken",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "inputAmount",
        "type": "uint256"
    }],
    "name": "getDepositMinimumSwapOutAmount",
    "outputs": [{
        "internalType": "uint256",
        "name": "swapInAmount",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "minimumSwapOutAmount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [{
        "internalType": "address",
        "name": "strategyAddress",
        "type": "address"
    }],
    "name": "getEarnMinimumSwapOutAmount",
    "outputs": [{
        "internalType": "uint256",
        "name": "minimumToken0SwapOutAmount",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "minimumToken1SwapOutAmount",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "minimumBuybackSwapOutAmount",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}]