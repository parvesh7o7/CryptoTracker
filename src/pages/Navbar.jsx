import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
export const searchQueryContext = createContext(null);
function Navbar() {
    const navigate = useNavigate();
    const { setSearchValue } = useContext(searchQueryContext);
    const [searchCurrency, setSearchCurrency] = useState("");
    const location = useLocation();
    const isCryptoDisplay = location.pathname.includes('/coins/');
    console.log(isCryptoDisplay)
    useEffect(() => {
        setSearchValue(searchCurrency);
    }, [searchCurrency]);
    return (
        <>
            <div className="nav-container">
                <div className="nav-logo">
                    <h1>TraCrypto</h1>
                    <p>Fetching the Real time data</p>
                </div>
                <div className="nav-search">
                    {!isCryptoDisplay ? (
                        <input type="text" className="nav-input" placeholder="Currency" onChange={(e) => {
                            setSearchCurrency(e.target.value);
                        }} />) : (
                        <button className="go-back" onClick={() => navigate("/")}>{"\u2190"}Go Back</button>
                    )
                    }
                </div>
            </div>
        </>
    )
}
export default Navbar;