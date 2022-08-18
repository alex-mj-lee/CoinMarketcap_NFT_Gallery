import React, { useState, useContext } from "react";
import Image from "next/image";
import Search from "../assets/svg/search";
import { ConnectButton } from "web3uikit";
import { CoinMarketContext } from "../context/context";

import { useRouter } from "next/router";

const styles = {
  header:
    "bg-[#171924] text-white h-20 flex w-full py-[30px] justify-center xl:gap-[5%] lg:justify-between lg:px-8 gap-40 xl:gap-[3%]",
  headerWrapper:
    "flex justify-center max-w-screen-sm h-full pl-10 xl:pl-0 lg:hidden",
  nav: "flex justify-center items-center gap-[20px]",
  navItem: "relative mr-1 cursor-pointer hover:opacity-60",
  navLink: "text-white flex mx-[10px]",
  badge:
    "rounded-full bg-blue-600  h-1 w-1 absolute ring-4 right-0 bottom-5 top-1",
  inputContainer:
    "flex items-center justify-center p-2 rounded bg-[#212430] rounded-2xl",
  input: " bg-transparent outline-none text-white w-28 ml-3",
  hambugerButton: "cursor-pointer relative hidden h-6 w-6 lg:inline-block mt-1",
  hambugerTop: "absolute top-0 left-0 h-0.5 w-6 bg-white rotate-0 transition",
  hambugerMid: "absolute top-2 left-0 h-0.5 w-6 bg-white rotate-0 transition",
  hambugerBottom:
    "absolute top-4 left-0 h-0.5 w-6 bg-white rotate-0 transition",
  hambugerTopOpen:
    "absolute top-0 left-0 h-0.5 w-6 bg-white rotate-45 transition translate-y-2",
  hambugerBottomOpen:
    "absolute top-0 left-0 h-0.5 w-6 bg-white -rotate-45 transition translate-y-2",
  menuItem: "relative cursor-pointer pt-4 hover:opacity-60",
  menuLink: "ml-[40px] flex text-white",
};

const Headers = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { login, logOut, currentAccount } = useContext(CoinMarketContext);

  const router = useRouter();

  const backHome = () => {
    router.push("/");
  };
  const veiwNFTs = () => {
    router.push(`/NFTs/nft`);
  };

  return (
    <div className={styles.header}>
      <div
        onClick={backHome}
        className="h-5 w-32 cursor-pointer hover:opacity-60"
      >
        <Image
          alt="coinmarketcap logo"
          src="https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_white_1.svg"
          width={220}
          height={40}
        />
      </div>
      <div className={styles.headerWrapper}>
        <nav className={styles.nav}>
          <div className={styles.navItem} onClick={backHome}>
            <div className={styles.navLink}>Cryptocurrencies</div>
            <div className={styles.badge} />
          </div>
          <div className={styles.navItem}>
            <div className={styles.navLink}>Exchanges</div>
          </div>
          <div className={styles.navItem} onClick={veiwNFTs}>
            <div className={styles.navLink}>NFT</div>
            <div className={styles.badge} />
          </div>
        </nav>
      </div>

      <div className="flex items-center lg:hidden">
        <ConnectButton />
        <div className={styles.inputContainer}>
          <Search />
          <input className={styles.input} placeholder="Search" />
        </div>
      </div>

      {/* hamburger menu */}
      <div className=" hidden items-center gap-5 lg:flex">
        <div className="md:hidden">
          <ConnectButton />
        </div>
        <Search />

        {!openMenu ? (
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={styles.hambugerButton}
          >
            <span className={styles.hambugerTop}></span>
            <span className={styles.hambugerMid}></span>
            <span className={styles.hambugerBottom}></span>
          </button>
        ) : (
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className={styles.hambugerButton}
          >
            <span className={styles.hambugerTopOpen}></span>{" "}
            <span className={styles.hambugerBottomOpen}></span>
          </button>
        )}
      </div>
      {openMenu && (
        <div className="absolute top-20 left-0 z-10 hidden h-56 w-full bg-[#171924] lg:block">
          <div className={styles.menuItem} onClick={backHome}>
            <div className={styles.menuLink}>Cryptocurrencies</div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.menuLink}>Exchanges</div>
          </div>
          <div className={styles.menuItem} onClick={veiwNFTs}>
            <div className={styles.menuLink}>NFTs</div>
          </div>
          <div className={styles.menuItem}>
            {currentAccount ? (
              <button className={styles.menuLink} onClick={logOut}>
                Logout
              </button>
            ) : (
              <button className={styles.menuLink} onClick={login}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Headers;
