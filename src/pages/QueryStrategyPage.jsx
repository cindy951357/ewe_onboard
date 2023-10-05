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
const initArr = Array.from(Array(arbitrumStrategies.length));
export const QueryStrategyPage = () => {
    const [token0Arr, setToken0] = useState(initArr);
    const [token1Arr, setToken1] = useState(initArr);
    const [amount0Arr, setAmount0Arr] = useState(initArr);
    const [amount1Arr, setAmount1Arr] = useState(initArr);
    const [exchangeRateArr, setExchangeRateArr] = useState(initArr);
    const [usdMarketPrice, setUsdMarketPrice] = useState(0);


    const onFetchTokenAddrClick = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);

        let token0Arr = [];
        let token1Arr = [];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            const token0Res = await erc20.getToken0Address(arbitrumStrategies[i].address);
            const token1Res = await erc20.getToken1Address(arbitrumStrategies[i].address);
            token0Arr.push(token0Res);
            token1Arr.push(token1Res);
        }
        setToken0(token0Arr);
        setToken1(token1Arr);
    }


    const fetchExchangeRate = async () => {
        let arrTmp = [];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            if (arbitrumStrategies[i].priceAddress !== "") {
                try {
                    const provider2 = new ethers.providers.Web3Provider(window.ethereum);
                    const chainLinkContract = new ethers.Contract(arbitrumStrategies[i].priceAddress, aggregatorV3InterfaceABI, provider2);
                    const exchangeRate = await chainLinkContract.latestRoundData();
                    const exchangeRateAnswer = Math.pow(10, -8) * parseInt(exchangeRate.answer._hex);
                    arrTmp.push(exchangeRateAnswer);
                    console.log("exchangeRateAnswer", exchangeRateAnswer);
                } catch (err) {
                    console.log("fetchExchangeRate error", err, "i: ", i);
                }
                setExchangeRateArr(arrTmp);
            }
        }
    }

    const fetchTokenBalance = async () => {
        let amt0Arr = [];
        let amt1Arr = [];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);
                const tokenAmnts = await erc20.getStrategyLiquidityTokenBalance(arbitrumStrategies[i].address);
                console.log("tokenAmnts", tokenAmnts)
                amt0Arr.push(Math.pow(10, -18) * parseInt(tokenAmnts[0]._hex));
                amt1Arr.push(Math.pow(10, -18) * parseInt(tokenAmnts[1]._hex));
            } catch (err) {
                console.log("fetchTokenBalance error", err, "i: ", i);
            }

        }
        setAmount0Arr(amt0Arr);
        setAmount1Arr(amt1Arr);
        console.log("amt0Arr", amt0Arr);
    }

    const calcTVL = async () => {
        fetchExchangeRate();
        fetchTokenBalance();
    }

    const fetchUsdMarketPrice = async () => {
        const fetchRes = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=USD`).then((res) => {
            console.log(res); // Not working
            // setUsdMarketPrice(TODO:);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        // fetchUsdMarketPrice();
        onFetchTokenAddrClick();
    }, [])

    useEffect(() => {
        if (token0Arr[0] !== undefined) {
            calcTVL();
        }
    }, [token0Arr, token1Arr])

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
                            <DisplayTVL TVLValue={0} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;