import React from "react";

const Pagination = () => {
  return (
    <section className="pagination">
      <span className="pagination__arrow">&larr;</span>
      <span className="pagination__number">1</span>
      <span className="pagination__dots">...</span>
      <span className="pagination__number">99</span>
      <span className="pagination__number pagination__number-active">100</span>
      <span className="pagination__number">101</span>
      <span className="pagination__dots">...</span>
      <span className="pagination__number">200</span>
      <span className="pagination__arrow">&rarr;</span>
    </section>
  );
};

export default Pagination;
