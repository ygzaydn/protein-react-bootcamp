import React from "react";

const Pagination = ({ page, setPage, limit }) => {
  console.log(limit);
  return (
    <section className="pagination">
      {page > 1 && (
        <span className="pagination__arrow" onClick={() => setPage(page - 1)}>
          &larr;
        </span>
      )}
      {page > 1 && (
        <span className="pagination__number" onClick={() => setPage(1)}>
          1
        </span>
      )}
      {page > 3 && <span className="pagination__dots">...</span>}
      {page > 2 && (
        <span className="pagination__number" onClick={() => setPage(page - 1)}>
          {page - 1}
        </span>
      )}

      <span className="pagination__number pagination__number-active">
        {page}
      </span>
      {page < limit && (
        <span className="pagination__number" onClick={() => setPage(page + 1)}>
          {page + 1}
        </span>
      )}

      {page < limit - 2 && <span className="pagination__dots">...</span>}

      {page < limit - 1 && (
        <span className="pagination__number" onClick={() => setPage(78)}>
          {limit}
        </span>
      )}
      {page < limit - 1 && (
        <span className="pagination__arrow" onClick={() => setPage(page + 1)}>
          &rarr;
        </span>
      )}
    </section>
  );
};

export default Pagination;
