export const DisplayToken = ({ token0Res = "token0Res", token1Res = "token1Res" }) => {
    return (
        <div id="display_token">
            <div className="token0 rounded-xl w-full h-[50px] bg-white mb-3 px-2
                flex items-center
            ">
                token0 <span className="ml-2">{token0Res}</span>
            </div>
            <div className="token1 rounded-xl w-full h-[50px] bg-white px-2
                flex items-center
            ">
                token1 <span className="ml-2">{token1Res}</span>
            </div>
        </div>
    )
}

export default DisplayToken;