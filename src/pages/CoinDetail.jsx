import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CoinDataByID } from "../api/coinGecko";
import Loader from "../../AnimatedComps/Loader";
import { format } from "../../utils/formatter";
import { CartesianGrid, LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip } from 'recharts'
import { fetchChartData } from "../api/coinGecko";
import './CoinDetail.css';
function CoinDetail() {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('en-US', {
        notation: "compact",
        compactDisplay: "short"
    });
    async function fetchCryptoData(id) {
        try {
            const data = await CoinDataByID(id);
            setCrypto(data);
            console.log(data);
        } catch (e) {
            console.error(`Failed to fetch the data ${e}`);
        } finally {
            setIsLoading(false);
        }
    }
    async function LoadChartData(id) {
        try {
            const data = await fetchChartData(id);
            const formattedData = data.prices.map((price) => ({
                time: new Date(price[0]).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                }),
                price: price[1].toFixed(2)
            }))
            setChartData(formattedData);
            console.log(formattedData);
        } catch (e) {
            console.error(`Failed to fetch the data ${e}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCryptoData(id);
        LoadChartData(id);
    }, [id]);

    const price_change = crypto?.market_data?.price_change_24h || 0;
    const isPositive = price_change >= 0;
    return (
        <>
            <div className="app">
                {isLoading ? (
                    <>
                        <Loader />
                    </>
                ) : (
                    <>
                        {!crypto ? (
                            <>
                                <div className="no-data">
                                    <p>Coin not found</p>
                                    <button onClick={() => navigate('/')}>Go Back</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="coin-detail">
                                    <div className="coin-header">
                                        <div className="coin-title">
                                            <img src={crypto.image.large} alt={crypto.name} />
                                            <div>
                                                <h1>{crypto.name}</h1>
                                                <p className="symbol">{crypto.symbol.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <span className="market-rank">#{crypto.market_cap_rank}</span>
                                        <div className="price-section">
                                            <div className="current-price">
                                                <p className="crypto-current-price">{format(crypto.market_data.current_price.usd)}</p>
                                                <span className={`change-badge ${isPositive ? "positive" : "negative"}`}>
                                                    {isPositive ? "\u2191" : "\u2193"}
                                                    {" "}{Math.abs(crypto.market_data.price_change_percentage_24h).toFixed(3)}%</span>
                                            </div>
                                            <div className="price-peaks">
                                                <div className="price-high">
                                                    <p className="price-peak-title">24h High</p>
                                                    <h3 className="price-peak-value">
                                                        {format(crypto.market_data.high_24h.usd)}
                                                    </h3>
                                                </div>
                                                <div className="price-low">
                                                    <p className="price-peak-title">24h Low</p>
                                                    <h3 className="price-peak-value">
                                                        {format(crypto.market_data.low_24h.usd)}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="chart-section">
                                            <h1 className="chart-title">Price Chart (7 days)</h1>
                                            <ResponsiveContainer width="100%" height={500}>
                                                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                                                    <XAxis dataKey="time" tick={{ fill: '#8b95a5', fontSize: 11 }} tickLine={false} axisLine={false} />
                                                    <YAxis domain={['auto', 'auto']} tick={{ fill: '#8b95a5', fontSize: 11 }} tickLine={false} axisLine={false} width={80} tickFormatter={(v) => `$${Number(v).toLocaleString()}`} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            background: 'rgba(15,20,29,0.95)',
                                                            border: '1px solid rgba(0,242,254,0.2)',
                                                            borderRadius: '10px',
                                                            color: '#fff',
                                                            fontFamily: 'Inter, sans-serif'
                                                        }}
                                                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Price']}
                                                    />
                                                    <Line
                                                        dataKey="price"
                                                        type="monotone"
                                                        stroke="url(#lineGradient)"
                                                        strokeWidth={2.5}
                                                        dot={false}
                                                        activeDot={{ r: 5, fill: '#00f2fe', strokeWidth: 0 }}
                                                    />
                                                    <defs>
                                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                            <stop offset="0%" stopColor="#00f2fe" />
                                                            <stop offset="100%" stopColor="#4facfe" />
                                                        </linearGradient>
                                                    </defs>
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="stats">
                                            <div className="detail-stat-block">
                                                <h3 className="label-stat">MARKET CAP</h3>
                                                <p className="stat-value">${(formatter.format(crypto.market_data.market_cap.usd))}</p>
                                            </div>
                                            <div className="detail-stat-block">
                                                <h3 className="label-stat">VOLUME (24H)</h3>
                                                <p className="stat-value">${formatter.format(crypto.market_data.total_volume.usd)}</p>
                                            </div>
                                            <div className="detail-stat-block">
                                                <h3 className="label-stat">CIRCULATING SUPPLY</h3>
                                                <p className="stat-value">{formatter.format(crypto.market_data.circulating_supply)}</p>
                                            </div>
                                            <div className="detail-stat-block">
                                                <h3 className="label-stat">TOTAL SUPPLY</h3>
                                                <p className="stat-value">{formatter.format(crypto.market_data.total_supply || 0)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}

            </div>
        </>
    )
}
export default CoinDetail;