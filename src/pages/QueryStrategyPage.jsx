import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayToken from "../components/DisplayToken";
import FetchButton from "../components/FetchButton";

export const QueryStrategyPage = () => {
    return (
        <div id="query_strategy_page" className="mt-20 mb-20 mx-20 w-full h-full bg-rose-200
            flex justify-center items-center flex-col
        ">
            {
                arbitrumStrategies.map(strategy => {
                    return (
                        <div key={strategy.token}
                            className="my-2 border-b-2 border-slate-700 border-solid pb-2"
                        >
                            <h1>{strategy.token}</h1>
                            <h3 className="font-extralight text-xs">{strategy.address}</h3>
                            <FetchButton />
                            <DisplayToken />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default QueryStrategyPage;