import React from "react";
interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (index: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  return (
    <nav aria-label="Pagination">
      <ul className="pagination pagination-lg">
        <li
          key={-1}
          className={`page-item ${currentPage === 0 ? "active" : ""}`}
          aria-current={currentPage === 0 ? "page" : undefined}
        >
          <button className="page-link" onClick={() => onPageChange(0)}>
            Row
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            aria-current={currentPage === index + 1 ? "page" : undefined}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
