import {instance} from ".";
import {COINS, IDS} from "../constants";
import {ParamsCoinMarket} from "../interfaces";

export const getCoinListWithMarketData = async (params?: ParamsCoinMarket) => {
	return await instance.get(COINS.MARKETS, {
		params: {
			...params,
			ids: IDS,
		},
	});
};
