import { useState } from "react";
function Navbar() {
    const [currency, setCurrency] = useState(null);
    return (
        <>
            <div className="nav-container">
                <div className="nav-logo">
                    <h1>TraCrypto</h1>
                    <p>Fetching the Real time data</p>
                </div>
                <div className="nav-search">

                    <input type="text" className="nav-input" placeholder="Currency" onChange={(e) => {
                        setCurrency(e.target.value);
                    }} />
                </div>
            </div>
        </>
    )
}
export default Navbar;