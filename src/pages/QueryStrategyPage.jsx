import { useState } from 'react';
import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayToken from "../components/DisplayToken";
import FetchButton from "../components/FetchButton";
import erc20abi from "../data/ERC20abi.json";

const ethers = require("ethers")

export const QueryStrategyPage = () => {
    const [token0, setToken0] = useState('');
    const [token1, setToken1] = useState('');

    const onFetchClick = async (address) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const erc20 = new ethers.Contract(address, erc20abi, provider);
        const token0Res = await erc20.getToken0Address(address);
        const token1Res = await erc20.getToken0Address(address);
        setToken0(token0Res);
        setToken1(token1Res);
        console.log(token0Res, token1Res);
    }

    return (
        <div id="query_strategy_page" className="mt-20 mb-20 mx-20 w-full h-full bg-rose-200
            flex justify-center items-center flex-col
        ">
            {
                arbitrumStrategies.map(strategy => {
                    return (
                        <div key={strategy.token}
                            className="w-[350px] my-2 border-b-2 border-slate-700 border-solid pb-2"
                        >
                            <h1>{strategy.token}</h1>
                            <h3 className="font-extralight text-xs">{strategy.address}</h3>
                            <FetchButton address={strategy.address} onFetchClick={onFetchClick} />
                            <DisplayToken token0Res={token0} token1Res={token1} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;