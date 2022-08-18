import React, { useState, useEffect, useContext, useCallback } from "react";
import Image from "next/image";
import btc from "../assets/btc.png";
import eth from "../assets/eth.png";
import usdc from "../assets/usdc.png";
import usdt from "../assets/usdt.png";
import xrp from "../assets/xrp.png";
import cardano from "../assets/cardano.png";
import terra from "../assets/tera.png";
import solana from "../assets/solana.png";
import avalanche from "../assets/avalanche.png";
import bnb from "../assets/bnb.png";

import Rate from "./cmc-table/rate";
import DropDownBtn from "./buttons/DropDownBtn";
import RateFilled from "./buttons/RateFilled";

const styles = {
  // coinDetails: `min-h-screen text-white`,
  coinDetailsWrapper:
    "flex max-w-7xl mx-auto pt-20 xl:max-w-5xl xl:relative xl:max-h-screen lg:w-full lg:px-4 md:block md:-mt-5 lg:pt-14",
  coinDetailsLinks: "flex mt-3 flex-wrap",
  greyBtn: "mr-3 mb-3 rounded-xl px-4 py-1 bg-slate-800 md:hidden",
  coinSymbol: "ml-3 flex items-center rounded-xl bg-slate-800 p-2",
  coinRates:
    "flex justify-between w-full items-start xl:flex-col xl:items-end xl:gap-2 md:block",
  title: `text-gray-400 whitespace-nowrap mr-2`,
  coinInfo: `flex justify-between mt-10 p-4 border-t border-gray-800 xl:absolute xl:-bottom-52 xl:left-0 xl:w-full overflow-x-auto md:w-[97%] md:ml-1`,
  borderLeft: "ml-10 pl-5 w-full border-l border-gray-800",
};

const coinDetails = ({
  coinName,
  price,
  coinSymbol,
  coinInfo,
  btcInfo,
  ethInfo,
}) => {
  const formatNum = (num) => {
    return Number(num.toFixed(9));
  };
  const formatTowNum = (num) => {
    return Number(num.toFixed(2));
  };

  const coinIcon = () => {
    switch (coinName) {
      case "Bitcoin":
        return (
          <Image
            src={btc}
            alt="btc"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "Ethereum":
        return (
          <Image
            src={eth}
            alt="eth"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "USD Coin":
        return (
          <Image
            src={usdc}
            alt="usdc"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "Tether":
        return (
          <Image
            src={usdt}
            alt="usdt"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "XRP":
        return (
          <Image
            src={xrp}
            alt="xrp"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "Cardano":
        return (
          <Image
            src={cardano}
            alt="cardano"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "Terra":
        return (
          <Image
            src={terra}
            alt="terra"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "Solana":
        return (
          <Image
            src={solana}
            alt="solana"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "Avalanche":
        return (
          <Image
            src={avalanche}
            alt="avalanche"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "BNB":
        return (
          <Image
            src={bnb}
            alt="bnb"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      default:
        return (
          <Image
            src={btc}
            alt="btc"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
    }
  };
  return (
    // <main className={styles.coinDetails}>
    //   <div>
    <div className={styles.coinDetailsWrapper}>
      {/* Section 1 */}
      <div className="flex w-fit flex-col md:-mb-16 md:block">
        <div className="flex items-center ">
          {coinIcon()}
          &nbsp; &nbsp;
          <div>
            <div className="flex">
              <p className="text-3xl">{coinName}</p>
              &nbsp; &nbsp;&nbsp; &nbsp;
              <p className={styles.coinSymbol}>{coinSymbol}</p>
            </div>
          </div>
        </div>
        <br className="xl:hidden" />
        <br className="xl:hidden" />
        <br className="xl:hidden" />
        <br />
        <br />
        <div className={styles.coinDetailsLinks}>
          <div className={styles.greyBtn}>Explore</div>
          <div className={styles.greyBtn}>Community</div>
          <div className={styles.greyBtn}>Chat</div>
          <div className={styles.greyBtn}>Source code</div>
          <div className={styles.greyBtn}>Whitepaper</div>
        </div>
        <br />
        <p className="md:hidden">Topics</p>
        <div className={styles.coinDetailsLinks}>
          <div className={styles.greyBtn}>{coinInfo.tag1}</div>
          <div className={styles.greyBtn}>{coinInfo.tag2}</div>
          <div className={styles.greyBtn}>{coinInfo.tag3}</div>
          <div className={styles.greyBtn}>{coinInfo.tag4}</div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="">
        <div className={styles.coinRates}>
          <div>
            <p className="text-gray-400">
              {coinName} ({coinSymbol})
            </p>
            <div className="my-3 flex">
              <p className="text-4xl">${price}</p>
              <RateFilled
                isIncrement={coinInfo.hRate > 0 ? true : false}
                rate={coinInfo.hRate}
              />
            </div>
            <div className="flex items-start">
              <p className="mr-3 text-gray-400">
                {coinName === "Bitcoin" ? 1 : formatNum(price / btcInfo.price)}{" "}
                BTC
              </p>
              {coinName === "Bitcoin" ? (
                <></>
              ) : (
                <Rate
                  isIncrement={
                    btcInfo.hRate - coinInfo.hRate > 0 ? true : false
                  }
                  rate={formatTowNum(btcInfo.hRate - coinInfo.hRate)}
                />
              )}
            </div>
            <div className="flex items-start">
              <p className="mr-3 text-gray-400">
                {coinName === "Ethereum" ? 1 : formatNum(price / ethInfo.price)}{" "}
                ETH
              </p>
              {coinName === "Ethereum" ? (
                <></>
              ) : (
                <Rate
                  isIncrement={
                    ethInfo.hRate - coinInfo.hRate > 0 ? true : false
                  }
                  rate={formatTowNum(ethInfo.hRate - coinInfo.hRate)}
                />
              )}
            </div>
          </div>

          <div className="-mr-2 flex h-9 w-[377px] md:mt-3 sm:h-12 sm:w-11/12">
            <DropDownBtn label="Buy" />
            <DropDownBtn label="Exchange" />
            <DropDownBtn label="Gaming" />
            <DropDownBtn label="Earn Crypto" />
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.coinInfo}>
          <div>
            <div>
              <small className={styles.title}>Market Cap</small>
            </div>
            <small>${coinInfo.marketCap}</small>
            <Rate
              isIncrement={coinInfo.hRate > 0 ? true : false}
              rate={coinInfo.hRate}
            />
          </div>
          <div>
            <div className={styles.borderLeft}>
              <div>
                <small className={styles.title}>Fully Diluted Market Cap</small>
              </div>
              <small>${coinInfo.dilutedMarketCap}</small>
              <Rate
                isIncrement={coinInfo.hRate > 0 ? true : false}
                rate={coinInfo.hRate}
              />
            </div>
          </div>
          <div>
            <div className={styles.borderLeft}>
              <div>
                <small className={styles.title}>Volume BTC</small>
              </div>
              <small>${coinInfo.volume}</small>
              <Rate
                isIncrement={coinInfo.volumeRate > 0 ? true : false}
                rate={coinInfo.volumeRate}
              />
              <br />
              <div>
                <small className={styles.title}>Volume / Market Cap</small>
              </div>
              <small>{coinInfo.volumeMarketCap}</small>
            </div>
          </div>
          <div>
            <div className={styles.borderLeft}>
              <div>
                <small className={styles.title}>Circulating Supply</small>
              </div>
              <small>{coinInfo.circulSupply}</small>
              <br />
              <br />
              <div>
                <small className={styles.title}>Max Supply</small>
                <small>{coinInfo.maxSupply}</small>
              </div>
              <div>
                <small className={styles.title}>Total Supply</small>
                <small>{coinInfo.totalSupply}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </main>
  );
};

export default coinDetails;
