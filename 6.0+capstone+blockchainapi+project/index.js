// import express and axios
import express, { response } from "express";
import axios from "axios";

// port and app creation
const app = express();
const port = 3000;

// use of public folder for static files
app.use(express.static("public"));

// a headers consist of public api key of coinbase
const headers = {
  Accept: "application/json",
  "X-API-Token": "01565bd5-667f-4587-bd41-fe3eac2383bc",
};

// http get request
app.get("/", async (req, res) => {
  try {
    console.log("req.hit");
    // using axios npm to get the data from the coinbase
    const response = await axios.get(
      "https://api.blockchain.com/v3/exchange/tickers",
      headers,
    );
    console.log(response.data);

    // a loop to find the btc-usd from the array of the objects
    const result = response.data.find((item) => item.symbol === "BTC-USD");
    console.log("sdkfs" + result);
    console.log(result.price_24h);

    // rendering the data with ejs files
    res.render("index.ejs", {
      symbol: result.symbol,
      price_24h: result.price_24h,
      volume_24h: result.volume_24h,
      last_trade_price: result.last_trade_price,
    });

    // error handling 
  } catch (error) {
    console.log(error.response.data);
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });

  }
});

// event listener port
app.listen(port, () => {
  console.log("port online at " + port);
});
