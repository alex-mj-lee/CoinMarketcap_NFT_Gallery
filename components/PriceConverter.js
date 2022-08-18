import React, { useContext, useState } from "react";
import Image from "next/image";

import converter from "../assets/converter.png";
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
import { CoinMarketContext } from "../context/context";

const styles = {
  converter: `flex items-center justify-between bg-[#171924] border border-gray-500/10 px-5 py-5 rounded-xl md:block gap-3 relative`,
  convertButton: `bg-[#1d4ed8] p-2 px-5 w-min rounded-xl mt-5 cursor-pointer hover:opacity-60 md:ml-3`,
};

const CMCprcieConverter = ({
  from,
  fromSymbol,
  fromLogo,
  toLogo,
  price,
  to,
  toSymbol,
}) => {
  const { convertCrypto } = useContext(CoinMarketContext);
  const [switchBTN, setSwitchBTN] = useState(true);

  const coinIcon = (name) => {
    switch (name) {
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
      case "USDC":
        return (
          <Image
            src={usdc}
            alt="usdc"
            className="rounded-full"
            width={50}
            height={50}
          />
        );
      case "USDT":
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
    <div>
      <h2>
        {from} to {to} Converter
      </h2>
      <br />
      <div className={styles.converter}>
        <div className="flex h-20 w-1/2 items-center justify-between md:w-full">
          <div className="flex items-center">
            <div className="mr-3 h-12 w-12">
              {switchBTN ? coinIcon(fromLogo) : coinIcon(toLogo)}
            </div>
            <div>
              <p>{switchBTN ? fromSymbol : toSymbol}</p>
              <p className="w-32 md:w-40">{switchBTN ? from : to}</p>
            </div>
          </div>
          <div>
            <p className="overflow-scroll text-3xl">{switchBTN ? 1 : price}</p>
          </div>
        </div>
        <div
          className="cursor-pointer pt-2 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2  md:transform"
          onClick={() => setSwitchBTN(!switchBTN)}
        >
          <Image alt="price" src={converter} width={40} height={40} />
        </div>
        <div className="flex h-20 w-1/2 items-center justify-between md:w-full">
          <div className="flex items-center">
            <div className="mr-3 h-12 w-12">
              {switchBTN ? coinIcon(toLogo) : coinIcon(fromLogo)}
            </div>
            <div>
              <p>{switchBTN ? toSymbol : fromSymbol}</p>
              <p className="w-32 md:w-40">{switchBTN ? to : from}</p>
            </div>
          </div>
          <div>
            <p className="overflow-scroll text-3xl"> {switchBTN ? price : 1}</p>
          </div>
        </div>
      </div>

      <div className={styles.convertButton} onClick={convertCrypto}>
        Convert
      </div>
    </div>
  );
};

export default CMCprcieConverter;
