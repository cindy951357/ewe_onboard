import { useState, useEffect } from 'react';

import { minimumSwapOutAbi } from '../data/MinimumSwapOutAmountAbi';
import { FarmAbi } from '../data/FarmAbi';
import erc20abi from "../data/ERC20abi.json";
import { aggregatorV3InterfaceABI } from '../data/ExchangeAbi';
import { ERC20StandardAbi } from '../data/ERC20StandardAbi';

const ethers = require("ethers");
const tokenNamesArr = ['ETH', 'WETH', 'ARB'];

const WethArbStrategyAddr = "0xFCb00b689fBb30848a7603312051446a7549a3aB";
const MinimumSwapOutAmountCalculatorAddr = "0x11cbe4eAd0e33c9197fb779F31868dB781f57BDF";
const FarmContractAddr = "0xBaf1b741FEf2D06169543372ca547db6f696F1B0";
const queryAddressArbitrumOne = "0x079eB8819b04c48777CCAF22EA85C81C692057b7";
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
const WethArbPriceAddresses = [
    "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6"
];

const provider = new ethers.providers.Web3Provider(window.ethereum);


const DepositWithdrawPage = () => {
    const [depositValue, setDepositValue] = useState(-1);
    const [selectedTokenName, setSelectedTokenName] = useState(tokenNamesArr[0]);
    const [amount0, setAmount0] = useState(-1);
    const [amount1, setAmount1] = useState(-1);
    const [amount0USD, setAmount0USD] = useState(-1);
    const [amount1USD, setAmount1USD] = useState(-1);
    const [exchangeRate0, setExchangeRate0] = useState(-1);
    const [exchangeRate1, setExchangeRate1] = useState(-1);
    const [TVL, setTVL] = useState(-1);
    const [resultMessage, setResultMessage] = useState("");

    const onInputValueChange = e => {
        setDepositValue(parseFloat(e.target.value));
    }

    const onDropdownChange = e => {
        setSelectedTokenName(e.target.value);
    }

    const onDepositBtnClick = async () => {
        switch (selectedTokenName) {
            case "ETH":
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const swapContract = new ethers.Contract(MinimumSwapOutAmountCalculatorAddr, minimumSwapOutAbi, provider);
                const { minimumSwapOutAmount, swapInAmount } = await swapContract.getDepositMinimumSwapOutAmount(
                    WethArbStrategyAddr, tokenAddrs[selectedTokenName].address,
                    depositValue);
                console.log("getDepositMinimumSwapOutAmount: ", minimumSwapOutAmount, swapInAmount);

                //_strategyContract, _isETH, _inputToken, _inputAmount, _swapInAmount, _minimumSwapOutAmount
                const farmContract = new ethers.Contract(FarmContractAddr, FarmAbi, signer);
                console.log(
                    WethArbStrategyAddr,
                    true,
                    tokenAddrs[selectedTokenName].address,
                    "depositValue:", depositValue,
                    "swapInAmount:", parseInt(swapInAmount._hex, 16),
                    "swapOutAmount:", parseInt(minimumSwapOutAmount._hex, 16)
                );
                const result = await farmContract.depositLiquidity(
                    WethArbStrategyAddr,
                    true,
                    tokenAddrs[selectedTokenName].address,
                    depositValue,
                    parseInt(swapInAmount._hex, 16),
                    parseInt(minimumSwapOutAmount._hex, 16),
                    {
                        value: depositValue
                    }
                );
                console.log("farmContract ", result);
                setResultMessage(`result: ${result.hash}`)
                break;
            case "ARB":
            case "WETH":
                console.log("Deposit; Non-native token handling");
                const providerToken = new ethers.providers.Web3Provider(window.ethereum);
                await providerToken.send('eth_requestAccounts', []);
                const signerToken = await providerToken.getSigner();
                const swapContractToken = new ethers.Contract(MinimumSwapOutAmountCalculatorAddr, minimumSwapOutAbi, providerToken);
                const { minimumSwapOutAmount: minimumSwapOutAmountToken, swapInAmount: swapInAmountToken } =
                    await swapContractToken.getDepositMinimumSwapOutAmount(
                        WethArbStrategyAddr, tokenAddrs[selectedTokenName].address,
                        depositValue);
                console.log("Deposit; getDepositMinimumSwapOutAmount: ", minimumSwapOutAmountToken, swapInAmountToken);

                // Additional part for non-native token is approve function calling
                const tokenContract = new ethers.Contract(
                    tokenAddrs[selectedTokenName].address,
                    ERC20StandardAbi,
                    signerToken
                );
                const approveResult = await tokenContract.approve(WethArbStrategyAddr, depositValue);
                console.log("Deposit; approveResult", approveResult);

                //_strategyContract, _isETH, _inputToken, _inputAmount, _swapInAmount, _minimumSwapOutAmount
                const farmContractToken = new ethers.Contract(FarmContractAddr, FarmAbi, signerToken);
                const resultForToken = await farmContractToken.depositLiquidity(
                    WethArbStrategyAddr,
                    false,
                    tokenAddrs[selectedTokenName].address,
                    depositValue,
                    parseInt(swapInAmountToken._hex, 16),
                    parseInt(minimumSwapOutAmountToken._hex, 16),
                );
                console.log("Deposit; farmContract ", resultForToken);
                setResultMessage(`result: ${resultForToken.hash}`)
                break;
            default:
                return;
        }
        fetchExchangeRate();
        fetchTokenBalance();
        calcTVL();
    }

    const onWithdrawBtnClick = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const strategyInfoQuerierContract = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);
        const trackerTokenAddress = await strategyInfoQuerierContract.getTrackerTokenAddress(WethArbStrategyAddr);
        const trackerTokenContract = new ethers.Contract(
            trackerTokenAddress,
            ERC20StandardAbi,
            signer
        );
        const approveResult = await trackerTokenContract.approve(WethArbStrategyAddr, depositValue);
        console.log("Withdraw; approveResult", approveResult);
        const farmContractToken = new ethers.Contract(FarmContractAddr, FarmAbi, signer);
        const resultForToken = await farmContractToken.withdrawLiquidity(
            WethArbStrategyAddr,
            depositValue,
        );
        console.log("Withdraw; farmContract ", resultForToken);
        setResultMessage(`result: ${resultForToken.hash}`)
    }

    const fetchExchangeRate = async () => {
        let rate0 = -1;
        let rate1 = -1;
        try {
            const provider2 = new ethers.providers.Web3Provider(window.ethereum);
            const chainLinkContract0 = new ethers.Contract(WethArbPriceAddresses[0], aggregatorV3InterfaceABI, provider2);
            const chainLinkContract1 = new ethers.Contract(WethArbPriceAddresses[1], aggregatorV3InterfaceABI, provider2);
            const exchangeRate0 = await chainLinkContract0.latestRoundData();
            const exchangeRate1 = await chainLinkContract1.latestRoundData();
            const exchangeRateAnswer0 = Math.pow(10, -8) * parseInt(exchangeRate0.answer._hex, 16);
            const exchangeRateAnswer1 = Math.pow(10, -8) * parseInt(exchangeRate1.answer._hex, 16);
            rate0 = exchangeRateAnswer0;
            rate1 = exchangeRateAnswer1;
        } catch (err) {
            console.log("DepositWithdrawPage fetchExchangeRate error", err);
        }
        setExchangeRate0(rate0);
        setExchangeRate1(rate1);
        console.log("rate0", rate0);
    }

    const fetchTokenBalance = async () => {
        let amt0 = -1;
        let amt1 = -1;
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);
            const tokenAmnts = await erc20.getStrategyLiquidityTokenBalance(WethArbStrategyAddr);
            amt0 = (Math.pow(10, -tokenAddrs.WETH.decimal) * parseInt(tokenAmnts[0]._hex, 16));
            amt1 = (Math.pow(10, -tokenAddrs.ARB.decimal) * parseInt(tokenAmnts[1]._hex, 16));
        } catch (err) {
            console.log("DepositWithdrawPage fetchTokenBalance error", err);
        }
        setAmount0(amt0);
        setAmount1(amt1);
        console.log("amt0: ", amt0);
    }

    const calcTVL = async () => {
        let tmpTVL = -1;
        tmpTVL = amount0 * exchangeRate0 + amount1 * exchangeRate1;
        setAmount0USD(amount0 * exchangeRate0);
        setAmount1USD(amount1 * exchangeRate1);
        setTVL(tmpTVL);
        console.log("tmpTVL", tmpTVL);
    }


    useEffect(() => {
        if (exchangeRate1 !== -1 && amount1 - 1 !== -1) {
            calcTVL();
        }
    }, [exchangeRate1, amount1]);

    useEffect(() => {
        fetchExchangeRate();
        fetchTokenBalance();
    }, []);

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
                className="w-[400px] h-[500px] rounded-xl bg-gradient-to-b
                    from-purple-300 to-purple-500 p-2 mb-2 flex flex-col
                "
            >
                <h1 className="p-2 flex">Selected: {selectedTokenName}</h1>
                <h1 className="p-2 flex">TVL in USD: {TVL}</h1>
                <div className="p-2 flex flex-col">
                    Amount0 and amount1:
                    <p className="break-all">{amount0}</p>
                    <p className="break-all">{amount1}</p>
                </div>
                <div className="p-2 flex flex-col">
                    Amount0 and amount1 in USD:
                    <p className="break-all">$ {amount0USD}</p>
                    <p className="break-all">$ {amount1USD}</p>
                </div>
                <h2 className="p-2 flex">Deposit/Withdraw value:</h2>
                <input type="number" className="p-2 rounded-l flex mt-2" onChange={onInputValueChange}></input>
                <button className="p-2 flex h-[40px] w-[100px] rounded-xl bg-rose-200 
                    justify-center items-center self-center mt-2 pointer"
                    onClick={onDepositBtnClick}
                >
                    Deposit
                </button>
                <button className="p-2 flex h-[40px] w-[100px] rounded-xl bg-rose-200 
                    justify-center items-center self-center mt-2 pointer"
                    onClick={onWithdrawBtnClick}
                >
                    Withdraw
                </button>

                <div id="rersult_message" className="w-full h-[100px] bg-white 
                    flex rounded-xl mt-2 p-2"
                >
                    <p className="break-all">{resultMessage}</p>
                </div>
            </div>
        </div>
    )
}

export default DepositWithdrawPage;