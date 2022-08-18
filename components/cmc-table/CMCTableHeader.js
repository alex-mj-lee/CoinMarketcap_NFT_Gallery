import React from "react";
import ChevronDown from "../../assets/svg/chevronDown";
import Info from "../../assets/svg/info";

const styles = {
  textIcon: "flex items-center",
};
const CMCTableHeader = () => {
  return (
    <tbody>
      <tr>
        <th>
          <div className="w-10"></div>
        </th>
        <th className="flex w-8 items-center">
          <b># &nbsp;</b>
          <ChevronDown />
        </th>
        <th>Name</th>
        <th>
          <div className="w-24">Price</div>
        </th>
        <th>
          <div className="w-20">24h %</div>
        </th>
        <th>
          <div className="w-24">7d %</div>
        </th>
        <th>
          <div className="flex w-44 items-center">
            <p className="mr-2">Market Cap</p>
            <Info />
          </div>
        </th>
        <th>
          <div className={styles.textIcon}>
            <p className="mr-2">Volume(24)</p>
            <Info />
          </div>
        </th>
        <th className="w-40">
          <div className={styles.textIcon}>
            <p className="mr-2">Circulating Supply</p>
            <Info />
          </div>
        </th>
        <th className="w-40">Last 7 days</th>
      </tr>
    </tbody>
  );
};

export default CMCTableHeader;
