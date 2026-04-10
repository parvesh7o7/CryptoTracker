import { use, useContext, useEffect, useState } from "react";
import { CoinData } from "../api/coinGecko";
import Loader from "../../AnimatedComps/Loader";
import CryptoCard from "../../components/CryptoCard";
import { searchQueryContext } from "./Navbar";
function Home() {
    const { searchValue } = useContext(searchQueryContext);
    const [currencyList, setCurrencyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState("grid");
    const [filterState, setFilterState] = useState("rank");
    const [filteredList, setFilteredList] = useState([]);
    async function getCoinData() {
        try {
            const data = await CoinData();
            setCurrencyList(data);
            console.log(data);
        } catch (e) {
            console.error(`Error occured while fetching data: ${e}`);
        } finally {
            setIsLoading(false);
        }
    }

    function filterAndSort() {
        const filter = currencyList.filter((crypto) =>
            crypto.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        filter.sort((a, b) => {
            switch (filterState) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price_asc":
                    return a.current_price - b.current_price;
                case "price_desc":
                    return b.current_price - a.current_price;
                case "change_24hr":
                    return a.price_change_percentage_24h - b.price_change_percentage_24h;
                case "market_cap":
                    return a.market_cap - b.market_cap;
                case "rank":
                    return a.market_cap_rank - b.market_cap_rank;
                default:
                    return a.market_cap_rank - b.market_cap_rank;
            }
        })
        setFilteredList(filter);
    }
    useEffect(() => {
        getCoinData();
    }, [])
    useEffect(() => {
        filterAndSort();
    }, [filterState, currencyList, searchValue])
    return (
        <>
            <div className="app">
                <div className="controls">
                    <div className="filtering">
                        <select value={filterState} onChange={(e => {
                            setFilterState(e.target.value);
                        })}>
                            <option value="rank">Rank</option>
                            <option value="name">Name</option>
                            <option value="price_asc">Price (Low to High)</option>
                            <option value="price_desc">Price (High to Low)</option>
                            <option value="change_24hr">24hr change</option>
                            <option value="market_cap">Market Cap</option>
                        </select>
                    </div>
                    <div className="view">
                        <button className={view === "grid" ? "active" : ""} onClick={() => {
                            setView("grid")
                        }}>Grid</button>
                        <button className={view === "list" ? "active" : ""} onClick={() => {
                            setView("list")
                        }}>List</button>
                    </div>
                </div>
                {isLoading ? (
                    <>
                        <Loader />
                        <p>Loading Crypto Data</p>
                    </>
                ) :
                    (
                        <div className={view === "grid" ? "cryptoData_grid" : "cryptoData_list"}>
                            {filteredList.map((crypto, key) => (
                                <>
                                    <CryptoCard crypto={crypto} key={crypto.name} />

                                </>
                            ))}

                        </div>
                    )
                }
            </div >
        </>
    )
}
export default Home;