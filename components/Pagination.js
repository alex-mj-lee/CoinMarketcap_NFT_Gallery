import React from "react";

const styles = {
  navBar: "mx-auto flex w-2/4 justify-center py-5",
  activePageNumber: "text-gray-200",
  pageNumber: "text-gray-500 ",
  numberContainer:
    "flex justify-center gap-4 rounded-3xl border-2 bg-transparent py-3 px-7 border-gray-400",
};

const Pagination = ({ perPage, totalUnits, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUnits / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={styles.navBar}>
      <ul className={styles.numberContainer}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => {
                paginate(number);
              }}
              href="#"
              className={
                currentPage === number
                  ? styles.activePageNumber
                  : styles.pageNumber
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
