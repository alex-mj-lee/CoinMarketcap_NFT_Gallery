import React from "react";
import Image from "next/image";

const CoinNameRow = ({ name, icon }) => {
  return (
    <div className="flex">
      <Image src={icon} alt={name} width={30} height={30} />
      <p>{name}</p>
    </div>
  );
};

export default CoinNameRow;
