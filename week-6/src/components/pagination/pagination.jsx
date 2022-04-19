import React, { useState, useEffect, useCallback } from "react";

import { RightArrow, LeftArrow } from "../../assets";

const Pagination = ({ information, page }) => {
    const [paginationArray, setPaginationArray] = useState([]);
    const longSkip = 4;
    useEffect(() => {
        generatePaginationArray(page);
    }, [page, information.limit]);

    const generatePaginationArray = (page) => {
        // For pagination, I've created paginationArray, which will be rendered on the page and changes whenever a page change
        const pageArray = [];
        if (page <= longSkip) {
            for (let i = 1; i < longSkip + 1; i++) {
                pageArray.push(i);
            }
            if (!pageArray.includes(page + 1)) {
                pageArray.push(page + 1);
            }
            pageArray.push("DOTS");
            pageArray.push(information.limit);
            pageArray.push("RightArrow");
        } else if (longSkip < page && page <= information.limit - longSkip) {
            pageArray.push("LeftArrow");
            pageArray.push(1);
            pageArray.push("DOTS");
            for (let i = page - 1; i <= page + 1; i++) {
                pageArray.push(i);
            }
            pageArray.push("DOTS");
            pageArray.push(information.limit);
            pageArray.push("RightArrow");
        } else {
            pageArray.push("LeftArrow");
            pageArray.push(1);
            pageArray.push("DOTS");
            if (page === information.limit - 3) {
                pageArray.push(information.limit - 4);
            }
            for (let i = information.limit - 3; i <= information.limit; i++) {
                pageArray.push(i);
            }
        }
        setPaginationArray([...pageArray]);
    };

    const generatePaginationJSX = useCallback(
        (paginationArrayElement, ind) => {
            switch (paginationArrayElement) {
                case "LeftArrow":
                    return (
                        <span
                            key={"larr"}
                            className="pagination__arrow"
                            onClick={() => changePage(page - longSkip)}
                        >
                            <img src={LeftArrow} alt="leftArrow" />
                        </span>
                    );

                case "RightArrow":
                    return (
                        <span
                            key={"rarr"}
                            className="pagination__arrow"
                            onClick={() => changePage(page + 4)}
                        >
                            <img src={RightArrow} alt="rightArrow" />
                        </span>
                    );

                case "DOTS":
                    return (
                        <span
                            key={paginationArrayElement + ind}
                            className="pagination__dots"
                        >
                            ...
                        </span>
                    );

                default:
                    return (
                        <span
                            key={paginationArrayElement + ind}
                            className={
                                paginationArrayElement === page
                                    ? "pagination__number pagination__number-active"
                                    : "pagination__number"
                            }
                            onClick={
                                paginationArrayElement !== page
                                    ? () => changePage(paginationArrayElement)
                                    : null
                            }
                        >
                            {paginationArrayElement}
                        </span>
                    );
            }
        },
        [page]
    );

    const changePage = (myPage = page) => {
        // Hash change triggers 'hashchange' eventlistener that I've created at the top of the component, whenever hash changes page state will also change.
        window.location.hash = myPage;
    };

    return (
        <section className="pagination">
            {information?.heroes &&
                paginationArray?.map((el, ind) =>
                    generatePaginationJSX(el, ind)
                )}
        </section>
    );
};

export default Pagination;
