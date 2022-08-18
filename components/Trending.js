import React, { useState, useContext, useEffect, useCallback } from "react";
import fire from "../assets/fire.png";
import gainers from "../assets/gainers.png";
import recent from "../assets/recent.png";
import ReactSwitch from "react-switch";
import Rate from "./cmc-table/rate";
import TrendingCard from "./TrendingCard";
import { CoinMarketContext } from "../context/context";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import ChevronDown from "../assets/svg/chevronDown";
// import ChevronUp from "../assets/svg/chevronUp";

const styles = {
  trendingWrapper: "mx-auto max-w-screen-xl lg:max-w-4xl md:max-w-2xl md:px-2",
  h1: "text-3xl text-white md:w-1/2 md:mb-4 sm:ml-3",
  flexCenter: "flex item-center lg:hidden",
  sliderContainer: "lg:max-w-3xl hidden lg:block sm:mt-6",
  //
  rate: "rate flex items-center",
  green: "ml-2 text-[#17C784] rate flex items-center",
  red: "ml-2 text-[#EA3943] rate flex items-center",
};

const Trending = () => {
  let { getTopCoins } = useContext(CoinMarketContext);
  const [checked, setChecked] = useState(true);
  const [rankCoin, setRankCoin] = useState([]);
  const [gainCoin, setGainCoin] = useState([]);
  const [loseCoin, setLoseCoin] = useState([]);
  // const [isIncrement, setIsIncrement] = useState(true);

  useEffect(() => {
    setData();
  }, []);
  const setData = useCallback(async () => {
    try {
      let response = await getTopCoins();
      let rankedRes = [];
      let gainedRes = [];
      let lostRes = [];

      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if (element.cmc_rank <= 3) {
          rankedRes.push(element);
        }
        if (element.quote.USD.percent_change_24h > 0) {
          gainedRes.push(element);
          const topGainElement = gainedRes
            .sort((a, b) => {
              return (
                b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
              );
            })
            .slice(0, 3);
          setGainCoin(topGainElement);
        }
        if (element.quote.USD.percent_change_24h < 0) {
          lostRes.push(element);
          const topLostElement = lostRes
            .sort((a, b) => {
              return (
                a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
              );
            })
            .slice(0, 3);
          setLoseCoin(topLostElement);
        }
      }

      setRankCoin(rankedRes);
    } catch (error) {
      console.log(error.message);
    }
  }, [getTopCoins]);

  return (
    <div className="mx-auto max-w-7xl text-white xl:max-w-5xl ">
      <div className={styles.trendingWrapper}>
        <div className="mx-auto flex justify-between lg:max-w-3xl">
          <h1 className={styles.h1}>
            Todays Cryptocurrency Prices by Market Cap
          </h1>
          <div className="flex pr-4">
            <p className="text-gray-400">Highlights &nbsp;</p>
            <ReactSwitch
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            />
          </div>
        </div>
        <br />

        {/* <p className="mx-auto gap-1 lg:max-w-3xl">
          The global crypto market cap is $1.74T, a
          <span className={isIncrement ? styles.green : styles.red}>
            {isIncrement ? (
              <ChevronUp fill="#17C784" />
            ) : (
              <ChevronDown fill="#EA3943" />
            )}
            0.53%
          </span>
          increase over the last day.
          <span className="ml-1 underline">Read More</span>
        </p> */}

        <div className="relative mx-auto flex gap-1 lg:max-w-3xl md:mb-5 md:inline-block sm:ml-4">
          <p>The global crypto market cap is $1.74T, a</p>
          <Rate isIncrement={true} rate={"0.53%"} />
          <p className="md:absolute md:top-6 md:left-20">
            increase over the last day.
          </p>
          <span className=" ml-1 underline">Read More</span>
        </div>
        <br />
        {checked && (
          <div className={styles.flexCenter}>
            <TrendingCard
              title="Trending"
              icon={fire}
              trendingData={rankCoin}
            />
            <TrendingCard
              title="Biggest Gainers"
              icon={gainers}
              trendingData={gainCoin}
            />
            <TrendingCard
              title="Biggest Losers"
              icon={recent}
              trendingData={loseCoin}
            />
          </div>
        )}

        {checked && (
          <Swiper
            modules={[Pagination]}
            spaceBetween={40}
            slidesPerView={2}
            pagination={{ clickable: true }}
            className={styles.sliderContainer}
            breakpoints={{
              100: {
                slidesPerView: 1,
              },
              630: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              <TrendingCard
                title="Trending"
                icon={fire}
                trendingData={rankCoin}
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrendingCard
                title="Biggest Gainers"
                icon={gainers}
                trendingData={gainCoin}
              />
            </SwiperSlide>
            <SwiperSlide>
              <TrendingCard
                title="Biggest Losers"
                icon={recent}
                trendingData={loseCoin}
              />
            </SwiperSlide>
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Trending;
