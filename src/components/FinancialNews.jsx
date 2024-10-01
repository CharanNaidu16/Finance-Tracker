import React, { useEffect, useState } from "react";
import "./Spinner.css";

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="loader"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-center">{message}</p>
);

const StockCard = ({ stock }) => (
  <div key={stock.symbol} className="border p-4 rounded shadow">
    <strong>
      {stock.name} ({stock.symbol}):
    </strong>
    <br />
    Exchange: {stock.exchange} ({stock.exchangeShortName}) <br />
    Price: ${stock.price}
  </div>
);

const FinancialNews = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch stock data
  const fetchStocks = async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const { signal } = controller;

    try {
      const response = await fetch(
        "https://financialmodelingprep.com/api/v3/stock/list?apikey=tZqPHwKPXo62nf76Arf1wRRvuCIaVF4j",
        { signal }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStocks(data.slice(0, 50));
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        setError("Failed to fetch stock data. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Stock Data</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </section>
      )}

      <div className="text-center mt-4">
        <button className="" onClick={fetchStocks}></button>
      </div>
    </div>
  );
};

export default FinancialNews;
