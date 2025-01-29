import React, { useEffect, useState } from 'react';

const Pagination = ({ page, totalPages, changePage }) => {
  const [pageArr, setPageArr] = useState([1, 2, 3, 4, 5]);

  const midPagination = pageArr.map((p, i) => (
    <button
      key={i}
      className="page"
      disabled={page === p}
      onClick={() => changePage(p)}
    >
      {p}
    </button>
  ));

  useEffect(() => {
    if (page <= 2) {
      setPageArr([1, 2, 3, 4, 5]);
    }
    if (page >= 4 && page <= totalPages - 2) {
      setPageArr([page - 2, page - 1, page, page + 1, page + 2]);
    }
  }, [page]);

  return (
    totalPages > 1 && (
      <div className="pagination">
        <button
          disabled={page === 1}
          className="page_prev"
          onClick={() => changePage((page) => page - 1)}
        >
          &#171;
        </button>
        {/*  */}
        {midPagination}
        {/*  */}
        <button
          disabled={page === totalPages}
          onClick={() => changePage((page) => page + 1)}
          className="page_next"
        >
          &#187;
        </button>
      </div>
    )
  );
};

export default Pagination;
