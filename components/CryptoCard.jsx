import { useState } from "react";
import { format } from "../utils/formatter";
import './CryptoCard.css'
import { Link } from "react-router";
function CryptoCard({ crypto }) {
    return (
        <>
            <Link to={`/coins/${crypto.id}`} style={{ textDecoration: "none" }}>
                <div className="crypto-card">
                    <div className="crypto-header">
                        <div className="crypto-info">
                            <img src={crypto.image} alt="" />
                            <div>
                                <h3>{crypto.name}</h3>
                                <p className="crypto-symbol">{(crypto.symbol).toUpperCase()}</p>
                                <span className="crypto-rank">#{crypto.market_cap_rank}</span>
                            </div>
                        </div>
                    </div>
                    <div className="crypto-price">
                        <p className="crypto-current-price">{format(crypto.current_price)}</p>
                        <p className={`change ${crypto.price_change_24h >= 0 ? "positive" : "negative"}`}>
                            {crypto.price_change_24h >= 0 ? "\u2191" : "\u2193"}
                            {" "}{Math.abs(crypto.price_change_percentage_24h).toFixed(3)}%</p>
                    </div>
                    <div className="crypto-stat">
                        <div className="market-cap left_align">
                            <p>Market Cap</p>
                            {crypto.market_cap >= 100000000 ? (format((crypto.market_cap / 1000000000))) + "B" : format(crypto.market_cap / 1000000) + "M"}
                        </div>
                        <div className="market-volume right_align">
                            <p>Volume</p>
                            {crypto.total_volume >= 100000000 ? (format((crypto.total_volume / 1000000000))) + "B" : format(crypto.total_volume / 1000000) + "M"}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default CryptoCard;