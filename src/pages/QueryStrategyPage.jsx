import { useState } from 'react';
import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayToken from "../components/DisplayToken";
import FetchButton from "../components/FetchButton";
import erc20abi from "../data/ERC20abi.json";

const ethers = require("ethers")

export const QueryStrategyPage = () => {
    const [token0Arr, setToken0] = useState(Array.from(Array(arbitrumStrategies.length)));
    const [token1Arr, setToken1] = useState(Array.from(Array(arbitrumStrategies.length)));

    const queryAddressArbitrumOne = "0x079eB8819b04c48777CCAF22EA85C81C692057b7";
    const onFetchClick = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
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

    return (
        <div id="query_strategy_page" className="mt-20 mb-20 mx-20 w-full h-full bg-rose-200
            flex justify-center items-center flex-col
        ">
            <FetchButton onFetchClick={onFetchClick} />
            {
                arbitrumStrategies.map((strategy, i) => {
                    return (
                        <div key={strategy.token}
                            className="w-[550px] my-2 border-b-2 border-slate-700 border-solid pb-2"
                        >
                            <h1>{strategy.token}</h1>
                            <h3 className="font-extralight text-xs">{strategy.address}</h3>

                            <DisplayToken token0Res={token0Arr[i]} token1Res={token1Arr[i]} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;