import React from "react";
import Image from "next/image";
import MoreButton from "./MoreButton";
import TrendingCardRow from "./TrendingCardRow";

const styles = {
  trendingCard:
    "w-full p-5 py-3 pb-0 bg-[#323546] rounded-xl text-white mr-3 lg:mb-12 lg:pb-3 lg:pt-5 overflow-x-auto md:px-3 sm:w-11/12 sm:mx-auto sm:px-5 sm:pt-6",
  trendingCardWrapper: "flex items-center justify-between",
};

const TrendingCard = ({ title, icon, trendingData }) => {
  return (
    <div className={styles.trendingCard}>
      <div className={styles.trendingCardWrapper}>
        <div className="flex">
          {icon && <Image src={icon} width={27} height={27} alt="icon" />}
          &nbsp; &nbsp;
          <p className="text-bold">{title}</p>
        </div>
        <MoreButton />
      </div>
      <br />
      {trendingData.map((item, index) => {
        return (
          <TrendingCardRow
            key={index}
            number={item.cmc_rank}
            symbol={item.symbol}
            name={item.name}
            isIncrement={item.quote.USD.percent_change_24h > 0 ? true : false}
            rate={item.quote.USD.percent_change_24h}
          />
        );
      })}
    </div>
  );
};

export default TrendingCard;
