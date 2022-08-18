import React, { useContext } from "react";
import { CoinMarketContext } from "../context/context";
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
import doge from "../assets/doge.png";
import dai from "../assets/dai.png";
import leo from "../assets/leo.png";
import ltc from "../assets/ltc.png";
import poly from "../assets/poly.png";
import shiba from "../assets/shiba.png";
import trx from "../assets/trx.png";
import pot from "../assets/pot.png";

const styles = {
  coinNameRow: "flex cursor-pointer",
  buyButton:
    "bg-[#1A1F3A] text-[#6188FF] p-1 px-3 text-sm rounded-lg cursor-pointer hover:opacity-50",
};

const CoinNameRow = ({ icon, name, click }) => {
  const { openModal } = useContext(CoinMarketContext);

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
      case "TRON":
        return (
          <Image
            src={trx}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "Dogecoin":
        return (
          <Image
            src={doge}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "Polkadot":
        return (
          <Image
            src={pot}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "Polygon":
        return (
          <Image
            src={poly}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "Litecoin":
        return (
          <Image
            src={ltc}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "UNUS SED LEO":
        return (
          <Image
            src={leo}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "Dai":
        return (
          <Image
            src={dai}
            className="rounded-full"
            width={20}
            height={20}
            alt=""
          />
        );
      case "Shiba Inu":
        return (
          <Image
            src={shiba}
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
    <div className={styles.coinNameRow}>
      <div className="mr-3 flex" onClick={click}>
        <div className="mr-2 h-5 w-5">{coinIcon()}</div>
        {name}
      </div>

      <p>
        {name === "Bitcoin" || name === "Ethereum" || name === "Tether" ? (
          <span className={styles.buyButton} onClick={() => openModal()}>
            Buy
          </span>
        ) : (
          <></>
        )}
      </p>
    </div>
  );
};
export default CoinNameRow;
