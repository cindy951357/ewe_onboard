export const FarmAbi = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "strategyContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "userAddress", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "liquidityNftId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "claimedRewardAmount", "type": "uint256" }], "name": "ClaimReward", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "strategyContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "userAddress", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "liquidityNftId", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "isETH", "type": "bool" }, { "indexed": false, "internalType": "address", "name": "inputToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "inputAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "increasedShare", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "userShareAfterDeposit", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "increasedToken0Amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "increasedToken1Amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "sendBackToken0Amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "sendBackToken1Amount", "type": "uint256" }], "name": "DepositLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "strategyContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "userAddress", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "liquidityNftId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "decreasedShare", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "userShareAfterWithdraw", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "userReceivedToken0Amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "userReceivedToken1Amount", "type": "uint256" }], "name": "WithdrawLiquidity", "type": "event" }, {
    "inputs": [{ "internalType": "address", "name": "_strategyContract", "type": "address" }], "name": "claimReward", "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [{
        "internalType": "address",
        "name": "_strategyContract",
        "type": "address"
    },
    {
        "internalType": "bool",
        "name": "_isETH",
        "type": "bool"
    },
    {
        "internalType": "address",
        "name": "_inputToken",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "_inputAmount",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "_swapInAmount",
        "type": "uint256"
    },
    {
        "internalType": "uint256",
        "name": "_minimumSwapOutAmount",
        "type": "uint256"
    }],
    "name": "depositLiquidity",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [{
        "internalType": "address",
        "name": "_strategyContract", "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "_depositAmount0",
        "type": "uint256"
    }, { "internalType": "uint256", "name": "_depositAmount1", "type": "uint256" }], "name": "getEstimatedUsedDepositToken", "outputs": [{ "internalType": "uint256", "name": "estimatedUsedAmount0", "type": "uint256" }, { "internalType": "uint256", "name": "estimatedUsedAmount1", "type": "uint256" }], "stateMutability": "view", "type": "function"
},
{
    "inputs": [{
        "internalType": "address",
        "name": "_strategyContract", "type": "address"
    },
    { "internalType": "address", "name": "_userAddress", "type": "address" }],
    "name": "getUserShare",
    "outputs": [{
        "internalType": "uint256",
        "name": "userShare",
        "type": "uint256"
    }],
    "stateMutability": "view", "type": "function"
},
{
    "inputs": [{
        "internalType": "address",
        "name": "_strategyContract",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "_withdrawShares", "type": "uint256"
    }],
    "name": "withdrawLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}];
