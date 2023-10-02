import { useState, useEffect } from 'react';
import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayTVL from '../components/DisplayTVL';
import DisplayToken from "../components/DisplayToken";
// import FetchButton from "../components/FetchButton";
import erc20abi from "../data/ERC20abi.json";
import { aggregatorV3InterfaceABI } from '../data/ExchangeAbi';

const ethers = require("ethers")
const queryAddressArbitrumOne = "0x079eB8819b04c48777CCAF22EA85C81C692057b7";
const initArr = Array.from(Array(arbitrumStrategies.length));
export const QueryStrategyPage = () => {
    // const [erc20, setErc20] = useState(null);
    const [token0Arr, setToken0] = useState(initArr);
    const [token1Arr, setToken1] = useState(initArr);
    const [amount0Arr, setAmount0Arr] = useState(initArr);
    const [amount1Arr, setAmount1Arr] = useState(initArr);
    const [usdMarketPrice, setUsdMarketPrice] = useState(0);


    const onFetchTokenAddrClick = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);
        // setErc20(erc20);

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


    const calcTVL = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const erc20 = new ethers.Contract(queryAddressArbitrumOne, erc20abi, provider);



        let amt0Arr = [];
        let amt1Arr = [];
        for (let i = 0; i < arbitrumStrategies.length; i++) {
            const chainLinkContract = new ethers.Contract(arbitrumStrategies[i].address, aggregatorV3InterfaceABI, provider);
            const tokenAmnts = await erc20.getStrategyLiquidityTokenBalance(arbitrumStrategies[i].address);
            console.log("Result tokenAmnts is:", tokenAmnts);
            amt0Arr.push(tokenAmnts[0]);
            amt1Arr.push(tokenAmnts[1]);
            const exchangeRate = await chainLinkContract.latestRoundData();
            console.log("exchangeRate", exchangeRate);
        }
        setAmount0Arr(amt0Arr);
        console.log(amt0Arr);
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
        calcTVL();
    }, [])

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
                            <DisplayTVL TVLValue={amount0Arr[2]} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;