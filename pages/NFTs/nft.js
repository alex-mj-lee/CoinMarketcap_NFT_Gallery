import React, { useState, useReducer } from "react";
import Headers from "../../components/Headers";
import SearchBox from "../../components/NFTs/SearchBox";
import Pagination from "../../components/Pagination";
import NFTCard from "../../components/NFTs/NftCard";

const styles = {
  nftsContainer:
    "mt-14 flex mx-auto max-w-screen-xl flex-wrap items-center justify-center gap-y-12 gap-x-4 md:grid md:grid-cols-2 md:grid-rows-8 sm:grid-cols-1 md:mx-4",
};

const reducer = (state, action) => {
  if (action.type == "add") {
    const stateArray = [...state, action.data];
    return stateArray.flat(1);
  }
};
const nft = () => {
  const [wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  //   const [state, dispatch] = useReducer(reducer, [])

  ///Pagination Hook///
  const [currentPage, setCurrentPage] = useState(1);
  const nftsPerPage = "18";

  ///API FETCHING////
  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");

    if (!collection.length) {
      var requestOptions = {
        method: "GET",
      };

      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs/`;
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }
    if (nfts) {
      console.log(nfts.ownedNfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection`;

      // `https://eth-mainnet.alchemyapi.io/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log(nfts.nfts);
        setNFTs(nfts.nfts);
      }
    }
  };
  console.log(NFTs);
  //   const fetchAllNFTsForCollection = async () => {
  //     if (collection.length) {
  //       async function callGetNFTsForCollectionOnce(startToken = '') {
  //         const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection/`
  //         const url = `${baseURL}/?contractAddress=${collection}&startToken=${startToken}&withMetadata=${'true'}`
  //         const response = await axios.get(url)
  //         return response.data
  //       }

  //       let startToken = '100'
  //       let hasNextPage = true
  //       let totalNftsFound = 0
  //       while (hasNextPage) {
  //         const { nfts, nextToken } = await callGetNFTsForCollectionOnce(
  //           startToken
  //         )
  //         if (!nextToken) {
  //           // When nextToken is not present, then there are no more NFTs to fetch.
  //           hasNextPage = false
  //         }
  //         startToken = nextToken
  //         totalNftsFound += nfts.length
  //         setTotalNFTsNum(totalNftsFound)
  //         dispatch({
  //           type: 'add',
  //           data: nfts,
  //         })
  //       }
  //     }
  //     if (state) {
  //       console.log('NFTs in collection', state)
  //       setNFTs(state)
  //     }
  //   }

  const fetchOption = () => {
    if (fetchForCollection) {
      fetchNFTsForCollection();
    } else fetchNFTs();
  };

  //Get Current nfts
  const indexOfLastPost = currentPage * nftsPerPage;
  const indexOfFirstPost = indexOfLastPost - nftsPerPage;
  const currenNFTs = NFTs.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Headers />
      <main>
        <SearchBox
          walletHandler={(e) => setWallet(e)}
          collectionHandler={(e) => setCollection(e)}
          btnClickHandler={() => fetchOption()}
          checkBoxHanlder={(e) => setFetchForCollection(e)}
          value={{ wallet, collection }}
        />
        <div className={styles.nftsContainer}>
          {NFTs.length > 0 &&
            currenNFTs.map((nft) => {
              return <NFTCard nft={nft} />;
            })}
        </div>
        <div>
          {NFTs.length > 0 && (
            <Pagination
              perPage={nftsPerPage}
              totalUnits={NFTs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default nft;
