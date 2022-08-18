import React from "react";
import ChevronDown from "../../assets/svg/chevronDown";

const BearishFilled = () => {
  return (
    <div className="flex items-center">
      <ChevronDown fill="#17C784" />
      <small className="ml-1 text-[#17C784]">Bullish</small>
    </div>
  );
};

export default BearishFilled;
