/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BackgroundImage from './assets/background2.png';
import MarvelText from './assets/marvelText.png';
import Gray from './assets/gray.png';

function App() {
  const [page, setPage] = useState(1); // tracks current page
  const [limit, setLimit] = useState(0); // tracks max number of page
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationArray, setPaginationArray] = useState([]);

  const longSkip = 4;

  useEffect(() => {
    // Hash changer event listener to adapt hash changes. So that users can browse any page they want to. ..../#<page-number>

    window.addEventListener('hashchange', () => pageChecker());
    return () => window.removeEventListener('hashchange', () => pageChecker());
  }, []);

  useEffect(() => {
    // useEffect hook to assign hash, and query if necessary
    window.location.hash = page;
    getData();
    generatePaginationArray(page);
  }, [page, limit]);

  const pageChecker = () => {
    // pageChecker method is used to dynamically check the value of state 'page'.
    let pageToCheck = parseInt(window.location.hash.split('#')[1]);
    if (page !== pageToCheck) {
      setPage(pageToCheck);
    }
  };

  const getData = () => {
    // main function for query action. Helps us to store data on sessionStorage and avoids unnecessary fetch actions.
    const storageItems = JSON.parse(sessionStorage.getItem('info')) || {};
    const limit = JSON.parse(sessionStorage.getItem('limit')) || 0;

    setLoading(true);

    if (!storageItems[page]) {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${
            process.env.REACT_APP_ENCODED_KEY
          }&offset=${(page - 1) * 20}&limit=20`
        )
        .then((resp) => {
          storageItems[page] = [...resp.data.data.results];
          sessionStorage.setItem('info', JSON.stringify(storageItems));
          sessionStorage.setItem('limit', JSON.stringify(resp.data.data.total / 20));
          setLimit(resp.data.data.total / 20);
          setHeroes(resp.data.data.results);
          setLoading(false);
        });
    } else {
      setHeroes(storageItems[page]);
      setLimit(limit);
      setLoading(false);
    }
  };

  const generatePaginationArray = (page) => {
    const pageArray = [];
    if (page <= longSkip) {
      for (let i = 1; i < longSkip + 1; i++) {
        pageArray.push(i);
      }
      if (!pageArray.includes(page + 1)) {
        pageArray.push(page + 1);
      }
      pageArray.push('DOTS');
      pageArray.push(limit);
      pageArray.push('RightArrow');
    } else if (longSkip < page && page <= limit - longSkip) {
      pageArray.push('LeftArrow');
      pageArray.push(1);
      pageArray.push('DOTS');
      for (let i = page - 1; i <= page + 1; i++) {
        pageArray.push(i);
      }
      pageArray.push('DOTS');
      pageArray.push(limit);
      pageArray.push('RightArrow');
    } else {
      pageArray.push('LeftArrow');
      pageArray.push(1);
      pageArray.push('DOTS');
      if (page === limit - 3) {
        pageArray.push(limit - 4);
      }
      for (let i = limit - 3; i <= limit; i++) {
        pageArray.push(i);
      }
    }
    setPaginationArray([...pageArray]);
  };

  const generatePaginationJSX = (paginationArrayElement, ind) => {
    switch (paginationArrayElement) {
      case 'LeftArrow':
        return (
          <span key={'larr'} className='pagination__arrow' onClick={() => setPage(page - longSkip)}>
            &larr;
          </span>
        );

      case 'RightArrow':
        return (
          <span key={'rarr'} className='pagination__arrow' onClick={() => setPage(page + 4)}>
            &rarr;
          </span>
        );

      case 'DOTS':
        return (
          <span key={paginationArrayElement + ind} className='pagination__dots'>
            ...
          </span>
        );

      default:
        return (
          <span
            key={paginationArrayElement}
            className={paginationArrayElement === page ? 'pagination__number pagination__number-active' : 'pagination__number'}
            onClick={() => setPage(paginationArrayElement)}
          >
            {paginationArrayElement}
          </span>
        );
    }
  };

  return (
    <body>
      <section className='header'>
        <img src={BackgroundImage} alt='Background' className='header__background' />
        <img src={MarvelText} alt='Marvel Text' className='header__marvelText' />
      </section>
      <section className='content'>
        <section className='cards'>
          {heroes?.map((el) => (
            <div className='cardItem' key={el.id}>
              <div className='cardItem__heroImage--grid'>
                <img
                  src={!loading ? el.thumbnail.path + '/portrait_xlarge.' + el.thumbnail.extension : Gray}
                  alt={el.name + '-img'}
                  className={'cardItem__heroImage--image'}
                />
              </div>

              <p className={'cardItem__text'}>{!loading ? el.name : 'Loading...'}</p>
            </div>
          ))}
        </section>
        <section className='pagination'>{paginationArray?.map((el, ind) => generatePaginationJSX(el, ind))}</section>
      </section>
    </body>
  );
}

export default App;

/*

  {0 < page && page < 5 && (
              <>
                {Array.from(Array(4).keys()).map((el) => (
                  <span
                    key={el + 1}
                    className={el + 1 === page ? 'pagination__number pagination__number-active' : 'pagination__number'}
                    onClick={() => setPage(el + 1)}
                  >
                    {el + 1}
                  </span>
                ))}
                {page === 4 && (
                  <span key={5} className={'pagination__number'} onClick={() => setPage(5)}>
                    5
                  </span>
                )}
                <span className='pagination__dots'>...</span>
                {limit > 0 && (
                  <span className='pagination__number' onClick={() => setPage(limit)}>
                    {limit}
                  </span>
                )}

                <span className='pagination__arrow' onClick={() => setPage(page + 4)}>
                  &rarr;
                </span>
              </>
            )}

            {page > 4 && page < limit - 3 && (
              <>
                <span className='pagination__arrow' onClick={() => setPage(page - 4)}>
                  &larr;
                </span>
                <span key={1} className={'pagination__number'} onClick={() => setPage(1)}>
                  1
                </span>
                <span className='pagination__dots'>...</span>
                <span key={page - 1} className={'pagination__number'} onClick={() => setPage(page - 1)}>
                  {page - 1}
                </span>
                <span key={page} className={'pagination__number pagination__number-active'}>
                  {page}
                </span>
                <span key={page + 1} className={'pagination__number'} onClick={() => setPage(page + 1)}>
                  {page + 1}
                </span>
                <span className='pagination__dots'>...</span>
                <span key={limit} className={'pagination__number'} onClick={() => setPage(limit)}>
                  {limit}
                </span>
                <span className='pagination__arrow' onClick={() => setPage(page + 4)}>
                  &rarr;
                </span>
              </>
            )}

            {page > limit - 4 && limit > 1 && (
              <>
                <span className='pagination__arrow' onClick={() => setPage(page - 4)}>
                  &larr;
                </span>
                <span key={1} className={'pagination__number'} onClick={() => setPage(1)}>
                  1
                </span>
                <span className='pagination__dots'>...</span>
                {page === limit - 3 && (
                  <span key={limit - 4} className='pagination__number' onClick={() => setPage(limit - 4)}>
                    {limit - 4}
                  </span>
                )}
                {Array.from(Array(6).keys()).map((el) => {
                  el += limit - 4;
                  if (page > el || el < limit) {
                    return (
                      <span
                        key={el + 1}
                        className={el + 1 === page ? 'pagination__number pagination__number-active' : 'pagination__number'}
                        onClick={() => setPage(el + 1)}
                      >
                        {el + 1}
                      </span>
                    );
                  }
                })}
              </>
            )}

*/
