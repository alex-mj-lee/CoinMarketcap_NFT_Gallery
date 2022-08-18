import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const backHome = () => {
    router.push("/");
  };
  return (
    <footer className="mt-10 h-1/3 w-full bg-[#171924] py-11 text-white lg:px-6 sm:px-1">
      {/* whole box */}
      <div className="mx-auto max-w-7xl xl:max-w-5xl lg:max-w-3xl  md:max-w-2xl sm:w-11/12">
        <div className="flex justify-between lg:flex-col">
          <div
            onClick={backHome}
            className="h-8 w-52 cursor-pointer hover:opacity-60"
          >
            <Image
              alt=""
              src="https://s2.coinmarketcap.com/static/cloud/img/coinmarketcap_white_1.svg"
              width={220}
              height={40}
            />
          </div>
          <div className="flex justify-between gap-10 lg:mt-10 md:grid md:grid-cols-2">
            <div className="flex flex-col ">
              <p className="text-xl font-semibold">Products</p>
              <ul className="mt-5 flex flex-col gap-2">
                <li>
                  <a href="#">Blockchain Explorer</a>
                </li>
                <li>
                  <a href="#">Crypto Indices</a>
                </li>
                <li>
                  <a href="#">Crypto API</a>
                </li>
                <li>
                  <a href="#">Jobs Board</a>
                </li>
                <li>
                  <a href="#">Sitemap</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="text-xl font-semibold">Products</p>
              <ul className="mt-5 flex flex-col gap-2">
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Terms of use</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Community Rules</a>
                </li>
                <li>
                  <a href="#">Disclaimer</a>
                </li>
                <li>
                  <a href="#">Methodology</a>
                </li>
                <li className="flex gap-1">
                  <a href="#">Careers</a>
                  <a
                    href="#"
                    className="w-21 h-7 rounded-lg border border-gray-200 px-1 pt-1 text-xs hover:border-transparent hover:bg-gray-200 hover:text-[#171924] sm:px-0"
                  >
                    We'er hiring!
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="text-xl font-semibold">Products</p>
              <ul className="mt-5 flex flex-col gap-2">
                <li>
                  <a href="#">Request Form</a>
                </li>
                <li>
                  <a href="#">Contact Support</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Glossary</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col ">
              <p className="text-xl font-semibold">Products</p>
              <ul className="mt-5 flex flex-col gap-2">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Telegram</a>
                </li>
                <li>
                  <a href="#">Instgram</a>
                </li>
                <li>
                  <a href="#">Interactive Chat</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="md:- mt-10">
          <div className="text-gray-300">
            &copy; 2022 CoinMarketCap. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
