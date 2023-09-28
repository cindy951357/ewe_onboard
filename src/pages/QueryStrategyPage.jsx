import { arbitrumStrategies } from "../data/ArbitrumOneStrategy";
import DisplayToken from "../components/DisplayToken";
import FetchButton from "../components/FetchButton";

export const QueryStrategyPage = () => {
    return (
        <div id="query_strategy_page">
            {
                arbitrumStrategies.map(strategy => {
                    return (
                        <div key={strategy.token}>
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