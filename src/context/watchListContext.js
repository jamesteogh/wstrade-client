import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    console.log();
    const [watchList, setWatchList] = useState(["googl","aapl","meta","baba","jpm"]);

    return (
        <WatchListContext.Provider value={{ watchList }}>
            {props.children}
        </WatchListContext.Provider>
    );
};
