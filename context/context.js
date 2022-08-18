import React, { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisQuery } from "react-moralis";

import {
  usdcAbi,
  filecoinAbi,
  etcAbi,
  zcashAbi,
  usdcAddress,
  filecoinAddress,
  etcAddress,
  zcashAddress,
} from "../lib/constants";

export const CoinMarketContext = createContext();

export const CoinMarketProvider = ({ children }) => {
  const { authenticate, isAuthenticated, user, Moralis, logout } = useMoralis();

  const { data: coins, isLoading: loadingCoins } = useMoralisQuery("Coins");

  const [currentAccount, setCurrentAccount] = useState("");
  const [openBuyCryptoModal, setOpenBuyCryptoModal] = useState(false);
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("Usdc");
  const [amount, setAmount] = useState("");
  const [coinData, setCoinData] = useState([]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
    setCurrentAccount("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      const account = user.get("ethAddress");
      setCurrentAccount(account);
    }
  }, [isAuthenticated]);

  const getContractAddress = () => {
    if (fromToken === "Filecoin") return filecoinAddress;
    if (fromToken === "Usdc") return usdcAddress;
    if (fromToken === "Etc") return etcAddress;
    if (fromToken === "Zcash") return zcashAddress;
  };

  const getToAddress = () => {
    if (toToken === "Filecoin") return filecoinAddress;
    if (toToken === "Usdc") return usdcAddress;
    if (toToken === "Etc") return etcAddress;
    if (toToken === "Zcash") return zcashAddress;
  };

  const getAbi = () => {
    if (toToken === "Filecoin") return filecoinAbi;
    if (toToken === "Usdc") return usdcAbi;
    if (toToken === "Etc") return etcAbi;
    if (toToken === "Zcash") return zcashAbi;
  };

  const openModal = () => {
    setOpenBuyCryptoModal(true);
  };

  const mint = async () => {
    try {
      if (fromToken === "ETH") {
        if (!isAuthenticated) return;
        await Moralis.enableWeb3();
        const contractAddress = getToAddress();
        const abi = getAbi();

        let options = {
          contractAddress: contractAddress,
          functionName: "mint",
          abi: abi,
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token(amount),
          },
        };
        sendETH();
        const transaction = await Moralis.executeFunction(options);
        const receipt = await transaction.wait(4);
        console.log(receipt);
      } else {
        swapTokens();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const swapTokens = async () => {
    try {
      if (!isAuthenticated) return;
      await Moralis.enableWeb3();

      if (fromToken === toToken) return alert("You cannot swap the same token");

      const fromOptions = {
        type: "erc20",
        amount: Moralis.Units.Token(amount, "18"),
        receiver: getContractAddress(),
        contractAddress: getContractAddress(),
      };
      const toMintOptions = {
        contractAddress: getToAddress(),
        functionName: "mint",
        abi: getAbi(),
        params: {
          to: currentAccount,
          amount: Moralis.Units.Token(amount, "18"),
        },
      };
      let fromTransaction = await Moralis.transfer(fromOptions);
      let toMintTransaction = await Moralis.executeFunction(toMintOptions);
      let fromReceipt = await fromTransaction.wait();
      let toReceipt = await toMintTransaction.wait();
      console.log(fromReceipt);
      console.log(toReceipt);
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendETH = async () => {
    if (!isAuthenticated) return;
    const contractAddress = getToAddress();

    let options = {
      type: "native",
      amount: Moralis.Units.ETH("0.01"),
      receiver: contractAddress,
    };
    const transaction = await Moralis.transfer(options);
    const receipt = await transaction.wait();
    console.log(receipt);
  };

  const getTopCoins = async () => {
    try {
      const res = await fetch("/api/getTopCoins");
      const data = await res.json();
      setCoinData(data.data.data);
      return data.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CoinMarketContext.Provider
      value={{
        getTopCoins,
        openBuyCryptoModal,
        setOpenBuyCryptoModal,
        fromToken,
        setFromToken,
        toToken,
        setToToken,
        amount,
        setAmount,
        mint,
        openModal,
        coins,
        loadingCoins,
        login,
        logOut,
        currentAccount,
        coinData,
      }}
    >
      {children}
    </CoinMarketContext.Provider>
  );
};
