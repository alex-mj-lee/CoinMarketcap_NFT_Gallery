import React, { useEffect, useState, useContext, useCallback } from "react";
import Headers from "../../components/Headers";
import CMCpriceConverter from "../../components/priceConverter";
import CoinDetails from "../../components/coinDetails";
import Footer from "../../components/Footer";
import { CoinMarketContext } from "../../context/context";

import Graph from "../../components/graph";
import Chat from "../../components/chat";

const styles = {
  info: "min-h-screen",
  main: "max-w-screen-xl text-white mx-auto ",
  flexStart:
    "flex items-start max-w-7xl mx-auto xl:max-w-5xl lg:inline-block lg:w-full",
  tabContainerWrapper: "p-10 px-0 w-2/3 lg:w-11/12 lg:mx-auto",
  flexBetween: "flex justify-between sm:flex-col sm:gap-2 sm:mb-5 sm:-mt-11",
  tabContainer:
    "flex items-center p-2 rounded-xl bg-[#222531] border border-gray-500/10 text-sm md:overflow-x-auto",
  tabItem: "px-2",
  activeTab: "p-1 px-2 mr-2 rounded-lg bg-[#171924] ",
  flexBetweenCenter: "flex justify-between",
  flexCenter: "flex items-center",
};

const info = () => {
  const [coinName, setCoinName] = useState("");
  const [price, setPrcie] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("");
  const [metchedCoin, setMethedCoin] = useState([]);
  const [btcInfo, setBtcInfo] = useState({ price: "", hRate: "" });
  const [ethInfo, setEthInfo] = useState({ price: "", hRate: "" });

  const { getTopCoins } = useContext(CoinMarketContext);

  useEffect(() => {
    getURLData();
  }, []);

  const getURLData = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    setCoinName(urlParams.get("coin"));
    setPrcie(+urlParams.get("price"));
    setCoinSymbol(urlParams.get("symbol"));
  };

  useEffect(() => {
    setData();
  }, [coinName]);

  const formatNum = (num) => {
    return Number(num.toFixed(2)).toLocaleString();
  };
  const formatTowNum = (num) => {
    return Number(num.toFixed(2));
  };

  const tagFormat = (tag) => {
    const captialize = (str) =>
      str[0].toUpperCase() + str.slice(1).toLowerCase();
    if (tag === "pow") return "PoW";
    if (tag === "pos") return "PoS";
    if (tag === "sha-256") return "SHA-256";
    return tag.split("-").map(captialize).join(" ");
  };

  const setData = useCallback(async () => {
    try {
      let response = await getTopCoins();
      // let metchedCoinData = []

      for (let i = 0; i < response.length; i++) {
        const element = response[i];

        if (element.name === coinName) {
          console.log(element);
          setMethedCoin({
            hRate: formatTowNum(element.quote.USD.percent_change_24h),
            marketCap: formatNum(element.quote.USD.market_cap),
            dilutedMarketCap: formatNum(
              element.quote.USD.fully_diluted_market_cap
            ),
            volume: formatNum(element.quote.USD.volume_24h),
            volumeRate: formatNum(element.quote.USD.volume_change_24h),
            maxSupply: formatNum(element.max_supply),
            totalSupply: formatNum(element.total_supply),
            volumeMarketCap: formatTowNum(
              element.quote.USD.volume_24h / element.quote.USD.market_cap
            ),
            circulSupply: formatNum(element.circulating_supply),
            tag1: tagFormat(element.tags[0]),
            tag2: tagFormat(element.tags[1]),
            tag3: tagFormat(element.tags[2]),
            tag4: tagFormat(element.tags[3]),
          });
        }
      }
      setBtcInfo({
        price: formatTowNum(response[0].quote.USD.price),
        hRate: formatTowNum(response[0].quote.USD.percent_change_24h),
      });
      setEthInfo({
        price: formatTowNum(response[1].quote.USD.price),
        hRate: formatTowNum(response[1].quote.USD.percent_change_24h),
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [coinName]);

  return (
    <div className={styles.info}>
      <Headers />
      <main className={styles.main}>
        <div className="xl:mb-60">
          <CoinDetails
            coinName={coinName}
            price={price}
            coinSymbol={coinSymbol}
            coinInfo={metchedCoin}
            btcInfo={btcInfo}
            ethInfo={ethInfo}
          />
        </div>

        <div className={styles.flexStart}>
          <div className={styles.tabContainerWrapper}>
            <div className={styles.flexBetween}>
              <div className={styles.tabContainer}>
                <div className={styles.activeTab}>price</div>
                <div className={styles.tabItem}>Market Cap</div>
                <div className={styles.tabItem}>Trading View</div>
                <div className={styles.tabItem}>History</div>
              </div>
              <div className={styles.tabContainer}>
                <p className={styles.activeTab}>1D</p>
                <p className={styles.tabItem}>2D</p>
                <p className={styles.tabItem}>1M</p>
                <p className={styles.tabItem}>3M</p>
                <p className={styles.tabItem}>1Y</p>
                <p className={styles.tabItem}>YTD</p>
                <p className={styles.tabItem}>ALL</p>
                <p className={styles.tabItem}>LOG</p>
              </div>
            </div>
            <br />
            <Graph />
            <br />

            <div className={styles.flexBetweenCenter}>
              <div className="flex gap-5">
                <div className={styles.flexCenter}>
                  <input className="outline-none" type="checkbox" /> &nbsp; USD
                </div>
                <div className={styles.flexCenter}>
                  <input className="outline-none" type="checkbox" /> &nbsp; BTC
                </div>
              </div>
              <div className="sm:w-2/5">
                <p>
                  Want more data? &nbsp;
                  <span className="text-[#6188FF]">Check out our API</span>
                </p>
              </div>
            </div>
            <br />
            <br />
            <CMCpriceConverter
              from={coinName}
              fromSymbol={coinSymbol}
              fromLogo={coinName}
              toLogo={"USDT"}
              price={price}
              to="United States Dollars"
              toSymbol="USD"
            />
          </div>
          <div className="ml-5 pt-10 lg:mx-auto lg:w-11/12">
            <Chat />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default info;
