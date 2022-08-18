import React from "react";
import ChevronUP from "../../assets/svg/chevronUp";
import ChevronDown from "../../assets/svg/chevronDown";

const styles = {
  greenRateFilled: "bg-green-600 flex items-center px-3 ml-3 rounded-xl",
  redRateFilled: "bg-red-600 flex items-center px-3 ml-3 rounded-xl",
};

const rateFilled = ({ isIncrement, rate }) => {
  return (
    <div
      className={isIncrement ? styles.greenRateFilled : styles.redRateFilled}
    >
      {isIncrement ? <ChevronUP /> : <ChevronDown />}

      <small className="pl-1">{rate}</small>
    </div>
  );
};

export default rateFilled;
