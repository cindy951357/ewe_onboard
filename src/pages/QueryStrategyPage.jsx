import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayToken from "../components/DisplayToken";
import FetchButton from "../components/FetchButton";
import erc20abi from "../data/ERC20api.json";

const ethers = require("ethers")

// You can also use an ENS name for the contract address
const daiAddress = "dai.tokens.ethers.eth";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const onFetchClick = async (address) => {
    console.log("clicked");
    const provider = new ethers.BrowserProvider(window.ethereum)
    const erc20 = new ethers.Contract(address, erc20abi, provider);
    const res = await erc20.getValue();
    console.log(res);

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