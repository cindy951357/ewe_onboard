import { useState, useEffect } from 'react';
import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayTVL from '../components/DisplayTVL';
import DisplayToken from "../components/DisplayToken";
import erc20abi from "../data/ERC20abi.json";
import { aggregatorV3InterfaceABI } from '../data/ExchangeAbi';

// const provider = new ethers.BrowserProvider(window.ethereum); //v6

const ethers = require("ethers")
const queryAddressArbitrumOne = "0x079eB8819b04c48777CCAF22EA85C81C692057b7";
const chainLinkAddr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
const initArr = Array.from(Array(arbitrumStrategies.length), () => -1);
export const QueryStrategyPage = () => {
    const [token0Arr, setToken0] = useState(initArr);
    const [token1Arr, setToken1] = useState(initArr);
    const [amount0Arr, setAmount0Arr] = useState(initArr);
    const [amount1Arr, setAmount1Arr] = useState(initArr);
    const [exchangeRate0Arr, setExchangeRate0Arr] = useState(initArr);
    const [exchangeRate1Arr, setExchangeRate1Arr] = useState(initArr);
    const [TVLArr, setTVLArr] = useState(initArr);

    const onFetchTokenAddrClick = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);

        let token0Arr = [...initArr];
        let token1Arr = [...initArr];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            const token0Res = await erc20.getToken0Address(arbitrumStrategies[i].address);
            const token1Res = await erc20.getToken1Address(arbitrumStrategies[i].address);
            token0Arr[i] = token0Res;
            token1Arr[i] = token1Res;
        }
        setToken0(token0Arr);
        setToken1(token1Arr);
    }


    const fetchExchangeRate = async () => {
        let arrTmp0 = [...initArr];
        let arrTmp1 = [...initArr];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            try {
                const provider2 = new ethers.providers.Web3Provider(window.ethereum);
                const chainLinkContract0 = new ethers.Contract(arbitrumStrategies[i].priceAddresses[0], aggregatorV3InterfaceABI, provider2);
                const chainLinkContract1 = new ethers.Contract(arbitrumStrategies[i].priceAddresses[1], aggregatorV3InterfaceABI, provider2);
                const exchangeRate0 = await chainLinkContract0.latestRoundData();
                const exchangeRate1 = await chainLinkContract1.latestRoundData();
                const exchangeRateAnswer0 = Math.pow(10, -8) * parseInt(exchangeRate0.answer._hex, 16);
                const exchangeRateAnswer1 = Math.pow(10, -8) * parseInt(exchangeRate1.answer._hex, 16);
                arrTmp0[i] = exchangeRateAnswer0;
                arrTmp1[i] = exchangeRateAnswer1;
            } catch (err) {
                console.log("fetchExchangeRate error", err, "i: ", i);
            }
            setExchangeRate0Arr(arrTmp0);
            setExchangeRate1Arr(arrTmp1);
        }
    }

    const fetchTokenBalance = async () => {
        let amt0Arr = [...initArr];
        let amt1Arr = [...initArr];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);
                const tokenAmnts = await erc20.getStrategyLiquidityTokenBalance(arbitrumStrategies[i].address);
                amt0Arr[i] = (Math.pow(10, -arbitrumStrategies[i].decimals[0]) * parseInt(tokenAmnts[0]._hex, 16));
                amt1Arr[i] = (Math.pow(10, -arbitrumStrategies[i].decimals[1]) * parseInt(tokenAmnts[1]._hex, 16));
            } catch (err) {
                console.log("fetchTokenBalance error", err, "i: ", i);
            }
        }
        setAmount0Arr(amt0Arr);
        setAmount1Arr(amt1Arr);
        console.log("amt0Arr", amt0Arr);
    }

    const calcTVL = async () => {
        console.log("exchangeRate0Arr", exchangeRate0Arr, "exchangeRate1Arr", exchangeRate1Arr);
        let TVLArr = [];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            console.log(i, amount0Arr[i], exchangeRate0Arr[i], amount1Arr[i], exchangeRate1Arr[i])
            const currTVL = amount0Arr[i] * exchangeRate0Arr[i] + amount1Arr[i] * exchangeRate1Arr[i];
            TVLArr.push(currTVL);
        }
        setTVLArr(TVLArr);
    }

    useEffect(() => {
        onFetchTokenAddrClick();
        fetchExchangeRate();
        fetchTokenBalance();
    }, []);

    useEffect(() => {
        if (amount1Arr[amount1Arr.legth - 1] !== -1 && exchangeRate1Arr[exchangeRate1Arr.length - 1] !== -1) {
            calcTVL();
        }
    }, [amount1Arr, exchangeRate1Arr]);

    return (
        <div id="query_strategy_page" className="mt-20 mb-20 mx-20 w-full h-full bg-rose-200
            flex justify-center items-center flex-col
        ">
            {/* <FetchButton onFetchClick={onFetchTokenAddrClick} /> */}
            {
                arbitrumStrategies.map((strategy, i) => {
                    return (
                        <div key={strategy.token}
                            className="w-[550px] my-2 border-b-2 border-slate-700 border-solid pb-2"
                        >
                            <h1>{strategy.token}</h1>
                            <h3 className="font-extralight text-xs">{strategy.address}</h3>

                            <DisplayToken token0Res={token0Arr[i]} token1Res={token1Arr[i]} />
                            <DisplayTVL TVLValue={TVLArr[i]} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;