import axios from "../constants/axios";

export const getData = (loadFunc, stateFunc, page) => {
    // main function for query action. Helps us to store data on sessionStorage and avoids unnecessary fetch actions.
    const storageItems = JSON.parse(sessionStorage.getItem("info")) || {};
    const limit = JSON.parse(sessionStorage.getItem("limit")) || 0;
    loadFunc(true);

    if (!storageItems[page]) {
        axios
            .get(
                `/characters?ts=1&apikey=${
                    process.env.REACT_APP_PUBLIC_KEY
                }&hash=${process.env.REACT_APP_ENCODED_KEY}&offset=${
                    (page - 1) * 20
                }&limit=20`
            )
            .then((resp) => {
                storageItems[page] = [...resp.data.data.results];
                sessionStorage.setItem("info", JSON.stringify(storageItems));
                sessionStorage.setItem(
                    "limit",
                    JSON.stringify(Math.ceil(resp.data.data.total / 20))
                );
                stateFunc({
                    heroes: resp.data.data.results,
                    limit: Math.ceil(resp.data.data.total / 20),
                });

                loadFunc(false);
            });
    } else {
        stateFunc({ heroes: storageItems[page], limit });
        loadFunc(false);
    }
};

export const fetchCharacter = (
    id,
    loadFunc,
    stateFunc,
    navigateFunc = null
) => {
    const storageItems = JSON.parse(sessionStorage.getItem("hero")) || {};

    loadFunc(true);
    if (id) {
        if (!storageItems.hasOwnProperty(id)) {
            axios
                .get(
                    `/characters/${id}?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}`
                )
                .then((resp) => {
                    const item = resp.data.data.results[0];
                    console.log(item);
                    stateFunc({ ...item });
                    sessionStorage.setItem(
                        "hero",
                        JSON.stringify({
                            ...storageItems,
                            [`${item.id}`]: { ...item },
                        })
                    );
                    loadFunc(false);
                });
        } else {
            const item = { ...storageItems[`${id}`] };
            stateFunc({ ...item });
            loadFunc(false);
        }
    }
    if (navigateFunc) {
        navigateFunc(`/hero:${id}`);
    }
};

export const getCharacterInfo = (text, setFunction, setCharacterFunc) => {
    const storage = JSON.parse(sessionStorage.getItem("search")) || {};
    if (text.length > 0) {
        if (!storage[`${text}`]) {
            axios
                .get(
                    `/characters?ts=1&apikey=${process.env.REACT_APP_PUBLIC_KEY}&hash=${process.env.REACT_APP_ENCODED_KEY}&nameStartsWith=${text}`
                )
                .then((resp) => {
                    const item = resp.data.data.results.slice(0, 5);
                    const itemToAdd = item.map((el) => ({
                        name: el.name,
                        id: el.id,
                    }));
                    sessionStorage.setItem(
                        "search",
                        JSON.stringify({
                            ...storage,
                            [text]: [...itemToAdd],
                        })
                    );
                    setFunction([...itemToAdd]);
                });
        } else {
            setFunction([...storage[`${text}`]]);
        }
    } else {
        setCharacterFunc([]);
    }
};
