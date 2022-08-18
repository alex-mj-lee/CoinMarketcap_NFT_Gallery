import React, { useState, useEffect, useContext } from "react";
import { GunContext } from "../context/gunContext";
import Pagination from "./Pagination";
import ChevronDown from "../assets/svg/chevronDown";
import ChevronUp from "../assets/svg/chevronUp";
import shiba from "../assets/shiba.png";
import Image from "next/image";
import Button from "./Button";
import ChatCard from "./ChatCard";
import { faker } from "@faker-js/faker";

const styles = {
  chat: "max-x-lg min-w-full ",
  flexBetween: "flex justify-between",
  flexCenter: "flex items-center justify-center",
  textBold: "font-bold",
  bullishLabel:
    "flex cursor-pointer active:bg-green-600 text-green-600 border border-green-600 h-min px-2 rounded-lg items-center",
  bearishLabel:
    "flex cursor-pointer active:bg-red-500 text-[#EA3943] items-center border border-red-600 h-min px-2 rounded-lg",
  chatContainer: "p-5 bg-[#222531] rounded-xl max-h-full",
  input: "w-full bg-[#323546] p-4 outline-none rounded-xl mt-1",
  postButtonContainer: "flex align-center justify-end mt-2",

  activeBullishLabel:
    "flex cursor-pointer bg-green-600 items-center text-white border border-green-600 h-min px-2 rounded-lg",
  activeBearishLabel:
    "flex cursor-pointer bg-red-500 text-white items-center border border-red-600 h-min px-2 rounded-lg",
};

const chat = () => {
  const [bullishValue, setBullishValue] = useState(true);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { gun, getMessages, state } = useContext(GunContext);

  // Pagination
  const perPage = "3";

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentMessage = messageList.slice(indexOfFirstPost, indexOfLastPost);

  const changePage = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    getMessages("GUN_REF_7");
  }, []);

  useEffect(() => {
    const formattedMessagesArray = () => {
      const uniquArray = state.messages.filter((value, index) => {
        const _value = JSON.stringify(value);

        return (
          index ===
          state.messages.findIndex((obj) => {
            return JSON.stringify(obj) === _value;
          })
        );
      });
      // console.log(uniquArray)
      return uniquArray;
    };

    setMessageList(formattedMessagesArray().slice(0).reverse());
  }, [state.messages]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const messagesRef = gun.get("GUN_REF_7");
    const newMessage = {
      sender: faker.name.findName(),
      avatar: shiba,
      content: message.trim(),
      isBullish: bullishValue,
      createdAt: Date().substring(4, 11),
      messageID: Date.now(),
    };
    messagesRef.set(newMessage);
    setMessage("");
  };

  return (
    <>
      <div className={styles.chat}>
        <div className={styles.flexBetween}>
          <p className={styles.textBold}>Live Shiba Inu Chat</p>
          <p className="text-[#6188FF]">See more</p>
        </div>
        <br />
        <div className={styles.chatContainer}>
          <div className={styles.flexBetween}>
            <div className="flex items-center justify-center">
              <Image src={shiba} width={70} height={70} />
              <div>
                <div className="mr-10 text-left">
                  <p className={styles.textBold}>Drak</p>
                  <p className="text-gray-400">@drakosi</p>
                </div>
              </div>
            </div>
            <div className={styles.flexCenter}>
              <p
                className={
                  !bullishValue
                    ? styles.bullishLabel
                    : styles.activeBullishLabel
                }
                onClick={() => setBullishValue(true)}
              >
                <ChevronUp fill="#17C784" />
                <small className="ml-1">Bullish</small>
              </p>
              &nbsp; &nbsp;
              <p
                className={
                  bullishValue ? styles.bearishLabel : styles.activeBearishLabel
                }
                onClick={() => setBullishValue(false)}
              >
                <ChevronDown fill="#a52b2b" />
                <small className="ml-1">Bearish</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 flex">
        <div className={styles.flexCenter}>
          <ChevronUp fill="#17C784" />
          &nbsp;
          <p>Bullish</p>
          &nbsp; &nbsp;
        </div>
        <div className={styles.flexCenter}>
          <ChevronDown fill="#a52b2b" />
          &nbsp;
          <p>Bullish</p>
        </div>
      </div>

      <input
        className={styles.input}
        placeholder="What's happening on BTC"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <div className={styles.postButtonContainer}>
        <Button label="Post" onPress={sendMessage} />
      </div>
      {currentMessage.map((message, index) => (
        <ChatCard
          key={index}
          sender={message.sender}
          senderUsername={message.username}
          senderAvatar={shiba}
          bullish={message.isBullish}
          timeStamp={message.createdAt}
          content={message.content}
          likes="2.7K"
          comments="19K"
        />
      ))}
      <div>
        <Pagination
          perPage={perPage}
          totalUnits={messageList.length}
          paginate={(e) => changePage(e)}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default chat;
