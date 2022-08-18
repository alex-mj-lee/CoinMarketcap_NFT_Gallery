import React from "react";
import Image from "next/image";
import More from "../../assets/svg/more";
import { useRouter } from "next/router";
import Star from "../../assets/svg/star";
import Rate from "./rate";
import CoinNameRow from "../CoinNameRow";

const CMCTableRow = ({
  starNum,
  coinName,
  coinSymbol,
  coinIcon,
  showBuy,
  hRate,
  dRate,
  hRateIsIncrement,
  dRateIsIncrement,
  price,
  marketCapValue,
  volumeCryptoValue,
  volumeValue,
  circulatingSupply,
}) => {
  const graphImages = [
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/52.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/825.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3408.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/5426.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7129.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/3957.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/328.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2416.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1765.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/2099.svg",
    "https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/7653.svg",
  ];

  const getRandomGraph = () => {
    const rndInt = Math.floor(Math.random() * 10) + 1;
    return graphImages[rndInt];
  };

  const router = useRouter();

  const viewCoinDetails = () => {
    router.push(
      `/currencies/info?symbol=${coinSymbol}&coin=${coinName}&price=${price.toFixed(
        2
      )}`
    );
  };
  // const viewPrice = () => {
  //   router.push(
  //     `/currencies/price?symbol=${coinSymbol}&coin=${coinName}&price=${price.toFixed(
  //       2
  //     )}`
  //   )
  // }

  const formatNum = (num) => {
    return Number(num.toFixed(2)).toLocaleString();
  };

  return (
    <tbody>
      <tr>
        <td>
          <Star />
        </td>
        <td>{starNum}</td>
        {coinIcon && coinIcon ? (
          <td>
            <CoinNameRow
              name={coinName}
              icon={coinIcon}
              click={viewCoinDetails}
            />
          </td>
        ) : (
          <></>
        )}

        <td>
          <p className="cursor-pointer" onClick={viewCoinDetails}>
            ${formatNum(price)}
          </p>
        </td>
        <td>
          <Rate isIncrement={hRateIsIncrement} rate={`${formatNum(hRate)}`} />
        </td>
        <td>
          <Rate isIncrement={dRateIsIncrement} rate={`${formatNum(dRate)}`} />
        </td>
        <td>
          <div>
            <p>${formatNum(marketCapValue)}</p>
          </div>
        </td>
        <td>
          <div>
            <p>{formatNum(volumeValue)}</p>

            <p className="text-gray-400 ">
              {formatNum(volumeCryptoValue)}
              {coinSymbol}
            </p>
          </div>
        </td>
        <td>
          <div>
            <p className="pl-2 ">{formatNum(circulatingSupply)}</p>
          </div>
        </td>
        <td>
          <div className="h-20 w-44">
            <Image src={getRandomGraph()} width={150} height={60} alt="graph" />
          </div>
        </td>
        <td>
          <More />
        </td>
      </tr>
    </tbody>
  );
};

export default CMCTableRow;
