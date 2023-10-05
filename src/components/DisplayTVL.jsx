const DisplayTVL = ({ TVLValue }) => {
    return (
        <div id="display_TVL" className="bg-green-100 rounded-xl h-[50px] px-2 mt-1
            flex items-center 
        ">
            TVL: {TVLValue}
        </div>
    )
}

export default DisplayTVL;