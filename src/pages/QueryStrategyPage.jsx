import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayToken from "../components/DisplayToken";
import FetchButton from "../components/FetchButton";
import erc20abi from "../data/ERC20abi.json";

const ethers = require("ethers")

// const daiAddress = "dai.tokens.ethers.eth";
// const daiAbi = [
//     "function name() view returns (string)",
//     "function symbol() view returns (string)",

//     "function balanceOf(address) view returns (uint)",

//     "function transfer(address to, uint amount)",

//     "function getToken0Address(address) returns (string)",

//     "event Transfer(address indexed from, address indexed to, uint amount)"
// ];

const onFetchClick = async (address) => {
    console.log("clicked");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(address, erc20abi, signer);
    const result = await erc20.getToken0Address();
    console.log(result); //TypeError: erc20.getToken0Address is not a function

}

export const QueryStrategyPage = () => {
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
                            <DisplayToken />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;