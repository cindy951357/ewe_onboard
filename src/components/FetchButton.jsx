export const FetchButton = ({ onFetchClick }) => {
    return (
        <div className="fetch-button rounded-xl  w-[150px] h-[50px] bg-blue-100 my-2 cursor-pointer
            flex items-center justify-center font-extrabold
            hover:bg-blue-200 focus:bg-blue-300
        "
            onClick={() => { onFetchClick() }}
        >
            Fetch
        </div>
    )
}

export default FetchButton;