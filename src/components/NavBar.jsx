import {
    Link,
} from 'react-router-dom';
const NavBar = () => {
    return (
        <div id="navbar"
            className="z-10 w-[200px] h-fit flex flex-row"
        >
            <div className="flex p-3">
                <Link to="/task1">
                    Task 1 and 2
                </Link>
            </div>
            <div className="flex p-3">
                <Link to="/">
                    Task 3
                </Link>
            </div>
            <hr></hr>
        </div>
    )
}

export default NavBar;