import React, { useState, useContext } from "react";
import { GunContext } from "../context/gunContext";
import Commnet from "../assets/svg/comment";
import Heart from "../assets/svg/heart";
import MoreHorizontal from "../assets/svg/moreHorizontal";
import Share from "../assets/svg/share";
import Image from "next/image";
import BullishFilled from "./buttons/BullishFilled";
import BearishFilled from "./buttons/BearishFilled";

const styles = {
  postAction: "flex items-center",
  chatCard: "border-b border-gray-700  pb-6 mb-6",
  chatCardWrapper: "flex items-center justify-between",
  flexCenter: "flex items-center",
  grayText: "text-gray-400 ml-2",
  gray400: "text-gray-400",
  flexBetween: "flex justify-between",
  messageContent: "my-4 mt-2",
  labelsContainer: "flex w-ull ml-3",
};

const chatCard = ({
  sender,
  senderAvatar,
  bullish,
  timeStamp,
  content = "",
  likes,
  comments,
}) => {
  const [chatMenu, setChatMenu] = useState(false);

  const { deleteMessage } = useContext(GunContext);

  // const deleteMessage1 = () => {
  //   if (message.trim() === '') return
  //   const messagesRef = gun.get('GUN_REF_7')
  //   const newMessage = {
  //     sender: faker.name.findName(),
  //     avatar: shiba,
  //     content: message.trim(),
  //     isBullish: bullishValue,
  //     createdAt: Date().substring(4, 11),
  //     messageID: Date.now(),
  //   }
  //   messagesRef.set(newMessage)
  // }

  return (
    <div className={styles.chatCard}>
      <div className={styles.chatCardWrapper}>
        <div className={styles.flexCenter}>
          <div>
            <Image
              width={40}
              height={40}
              src={senderAvatar}
              className="rounded-full"
              alt=""
            />
          </div>

          <div className={styles.labelsContainer}>
            {sender}
            &nbsp; • &nbsp;
            <span className={styles.gray400}>{timeStamp}</span>
            &nbsp; • &nbsp;
            {bullish ? <BullishFilled /> : <BearishFilled />}
          </div>
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => setChatMenu(!chatMenu)}
        >
          <MoreHorizontal />
          {chatMenu ? (
            <div className="absolute top-4 right-1 z-10 flex h-12 w-16 flex-col  rounded border border-solid border-gray-200 pl-1">
              <div
                className="cursor-point"
                onClick={() => deleteMessage(content)}
              >
                Delete
              </div>
              <div className="cursor-point">Edit</div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <p className={styles.messageContent}>{content}</p>

      <div className={styles.flexBetween}>
        <div className={styles.postAction}>
          <Commnet />
          <p className={styles.grayText}>{comments}</p>
        </div>
        <div className={styles.postAction}>
          <Heart />
          <p className={styles.grayText}>{likes}</p>
        </div>
        <div className={styles.postAction}>
          <Share />
          <p className={styles.grayText}>Share</p>
        </div>
      </div>
    </div>
  );
};

export default chatCard;
