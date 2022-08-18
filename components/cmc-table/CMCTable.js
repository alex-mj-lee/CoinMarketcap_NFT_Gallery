import React, { useState, useContext, useEffect } from "react";
import btc from "../../assets/btc.png";
import CMCTableHeader from "./CMCTableHeader";
import CMCTableRow from "../../components/cmc-table/CMCTableRow";
import Pagination from "../Pagination";
import { CoinMarketContext } from "../../context/context";

const CMCTable = () => {
  const { coinData } = useContext(CoinMarketContext);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const coinPerPage = "20";

  const indexOfLastPost = currentPage * coinPerPage;
  const indexOfFirstPost = indexOfLastPost - coinPerPage;
  const currentCoins = coinData.slice(indexOfFirstPost, indexOfLastPost);

  // const { name } = coinData[0]
  // console.log(name)
  // console.log(coinData[0])
  return (
    <>
      <div className="mx-auto max-w-7xl overflow-x-auto font-medium text-white xl:max-w-5xl lg:max-w-3xl md:max-w-2xl sm:w-11/12">
        <table>
          <CMCTableHeader />

          {coinData && coinData ? (
            currentCoins.map((coin, index) => {
              return (
                <CMCTableRow
                  key={index}
                  starNum={coin.cmc_rank}
                  coinName={coin.name}
                  coinSymbol={coin.symbol}
                  coinIcon={btc}
                  showBuy={true}
                  hRate={coin.quote.USD.percent_change_24h}
                  dRate={coin.quote.USD.percent_change_7d}
                  hRateIsIncrement={
                    coin.quote.USD.percent_change_24h > 0 ? true : false
                  }
                  dRateIsIncrement={
                    coin.quote.USD.percent_change_7d > 0 ? true : false
                  }
                  price={coin.quote.USD.price}
                  marketCapValue={coin.quote.USD.market_cap}
                  volumeCryptoValue={coin.quote.USD.volume_24h}
                  volumeValue={coin.total_supply}
                  circulatingSupply={coin.circulating_supply}
                />
              );
            })
          ) : (
            <></>
          )}
        </table>
      </div>
      <div>
        <Pagination
          perPage={20}
          totalUnits={coinData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default CMCTable;
