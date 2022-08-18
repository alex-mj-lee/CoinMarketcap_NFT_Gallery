import React from "react";
import Rate from "./cmc-table/rate";
import Image from "next/image";
import btc from "../assets/btc.png";
import eth from "../assets/eth.png";
import usdc from "../assets/usdc.png";
import usdt from "../assets/usdt.png";
import xrp from "../assets/xrp.png";
import cardano from "../assets/cardano.png";
import tera from "../assets/tera.png";
import solana from "../assets/solana.png";
import avalanche from "../assets/avalanche.png";
import bnb from "../assets/bnb.png";

const styles = {
  TrendingCardRow: "flex items-center justify-between mb-4 text-[0.93rem]",
};

const TrendingCardRow = ({ number, name, symbol, isIncrement, rate }) => {
  const coinIcon = () => {
    switch (name) {
      case "Bitcoin":
        return (
          <Image
            src={btc}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "Ethereum":
        return (
          <Image
            src={eth}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "Tether":
        return (
          <Image
            src={usdt}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "BNB":
        return (
          <Image
            src={bnb}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "USD Coin":
        return (
          <Image
            src={usdc}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "XRP":
        return (
          <Image
            src={xrp}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "Cardano":
        return (
          <Image
            src={cardano}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "Terra":
        return (
          <Image
            src={tera}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "Solana":
        return (
          <Image
            src={solana}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      case "Avalanche":
        return (
          <Image
            src={avalanche}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );

      default:
        return (
          <Image
            src={btc}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
    }
  };

  return (
    <div className={styles.TrendingCardRow}>
      <div className="flex w-full md:h-12">
        <p className="pt-2 opacity-40"> {number} </p>
        <div className="mx-5 pt-2">
          {name && <div className="mr-2">{coinIcon()}</div>}
          {/* {name && <Image src={coinIcon()} width={20} height={20} />} */}
        </div>
        <p className="text-bold flex flex-col">
          {name} &nbsp;
          <span className="text-gray-400">{symbol}</span>
        </p>
      </div>
      <Rate isIncrement={isIncrement} rate={rate.toFixed(2)} />
    </div>
  );
};

export default TrendingCardRow;
