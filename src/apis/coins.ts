import { instance } from ".";
import { COINS } from "../constants";
import { ParamsCoinMarket } from "../interfaces";

export const getCoinListWithMarketData = async (params?: ParamsCoinMarket) => {
    return await instance.get(COINS.MARKETS, {
        params: {
            ...params,
        },
    });
};

export const getCurrenciesList = async () => {
    return await instance.get(COINS.CURRENCIES);
};

export const getCategoryList = async () => {
    return await instance.get(COINS.CATEGORY);
};
