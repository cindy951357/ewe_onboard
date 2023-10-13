import { useState, useEffect } from 'react';

import { minimumSwapOutAbi } from '../data/MinimumSwapOutAmountAbi';
import { FarmAbi } from '../data/FarmAbi';

const ethers = require("ethers");
const tokenNamesArr = ['ETH', 'WETH', 'ARB'];

const WethArbStrategyAddr = "0xFCb00b689fBb30848a7603312051446a7549a3aB";
const MinimumSwapOutAmountCalculatorAddr = "0x11cbe4eAd0e33c9197fb779F31868dB781f57BDF";
const FarmContractAddr = "0xBaf1b741FEf2D06169543372ca547db6f696F1B0";
const tokenAddrs = {
    "ETH": {
        address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        decimal: 18
    },
    "WETH": {
        decimal: 18,
        address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
    },
    "ARB": {
        decimal: 18,
        address: "0x912CE59144191C1204E64559FE8253a0e49E6548"
    },
}
const provider = new ethers.providers.Web3Provider(window.ethereum);


const DepositWithdrawPage = () => {
    const [depositValue, setDepositValue] = useState(-1);
    const [selectedTokenName, setSelectedTokenName] = useState(tokenNamesArr[0]);

    const onInputValueChange = e => {
        setDepositValue(parseFloat(e.target.value));
    }

    const onDropdownChange = e => {
        setSelectedTokenName(e.target.value);
    }

    const onDepositBtnClick = async () => {
        switch (selectedTokenName) {
            case "ETH":
                const signer = await provider.getSigner();
                const swapContract = new ethers.Contract(MinimumSwapOutAmountCalculatorAddr, minimumSwapOutAbi, provider);
                const { minimumSwapOutAmount, swapInAmount } = await swapContract.getDepositMinimumSwapOutAmount(
                    WethArbStrategyAddr, tokenAddrs[selectedTokenName].address, depositValue);
                console.log("getDepositMinimumSwapOutAmount: ", minimumSwapOutAmount, swapInAmount);

                //_strategyContract, _isETH, _inputToken, _inputAmount, _swapInAmount, _minimumSwapOutAmount
                const farmContract = new ethers.Contract(FarmContractAddr, FarmAbi, signer);
                const result = await farmContract.depositLiquidity(WethArbStrategyAddr, true,
                    tokenAddrs[selectedTokenName].address,
                    depositValue, parseInt(swapInAmount._hex), parseInt(minimumSwapOutAmount._hex)
                );
                console.log("farmContract ", result);
                break;
            case "ARB":
            case "WETH":
                break;
            default:
                return;
        }

    }

    return (
        <div id="deposit_withdraw_page">
            <select onChange={onDropdownChange}>
                {
                    tokenNamesArr.map(tokenName => {
                        return (
                            <option key={tokenName} value={tokenName}>{tokenName}</option>
                        )
                    })
                }
            </select>
            <div
                className="w-[400px] h-[400px] rounded-xl bg-gradient-to-b
                    from-purple-300 to-purple-500 p-2 mb-2 flex flex-col
                "
            >
                <h1 className="p-2 flex">{selectedTokenName}</h1>
                <h2>Deposit value:</h2>
                <input type="number" className="p-2 rounded-l flex mt-2" onChange={onInputValueChange}></input>
                <button className="p-2 flex h-[40px] w-[100px] rounded-xl bg-rose-200 
                    justify-center items-center self-center mt-2 pointer"
                    onClick={onDepositBtnClick}
                >
                    Deposit
                </button>
            </div>
        </div>
    )
}

export default DepositWithdrawPage;