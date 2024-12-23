import {useQuery} from "@tanstack/react-query";
import {Image, Layout, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useMemo} from "react";
import styled from "styled-components";
import {getCoinListWithMarketData} from "../../apis/coins";
import {CoinMarket} from "../../interfaces";
import {formatCost} from "../../utils";

const LayoutContainer = styled(Layout)`
	width: 100vw;
	height: 100vh;
	display: flex;
	padding: 24px;
	background-color: white;
`;

const columns: ColumnsType<CoinMarket> = [
	{
		key: "#",
		dataIndex: "#",
		title: "#",
		width: 50,
		render(_, __, index) {
			return index + 1;
		},
		fixed: "left",
		align: "center",
	},
	{
		key: "name",
		dataIndex: "name",
		title: "Name",
		width: 200,
		render(_, {name, image}) {
			return (
				<Space>
					<Image src={image} width='24px' /> <div>{name}</div>
				</Space>
			);
		},
		fixed: "left",
	},
	{
		key: "current_price",
		dataIndex: "current_price",
		title: "Price",
		render(value) {
			return formatCost(value);
		},
		width: 100,
	},
	{
		key: "market_cap",
		dataIndex: "market_cap",
		title: "Market Cap",
		render(value) {
			return formatCost(value);
		},
		width: 200,
	},
	{
		key: "market_cap_rank",
		dataIndex: "market_cap_rank",
		title: "Market Cap Rank",
		width: 150,
	},
	{
		key: "low_24h",
		dataIndex: "low_24h",
		title: "Low 24h",
		render(value) {
			return {
				props: {
					style: {
						color: "red",
					},
				},
				children: formatCost(value),
			};
		},
		width: 100,
	},
	{
		key: "high_24h",
		dataIndex: "high_24h",
		title: "High 24h",
		render(value) {
			return {
				props: {
					style: {
						color: "green",
					},
				},
				children: formatCost(value),
			};
		},
		width: 100,
	},
	{
		key: "price_change_24h",
		dataIndex: "price_change_24h",
		title: "Price Change 24h",
		render(value) {
			return {
				props: {
					style: {
						color: value > 0 ? "green" : "red",
					},
				},
				children: value > 0 ? `+${formatCost(value)}` : formatCost(value),
			};
		},
		width: 150,
	},
	{
		key: "price_change_percentage_24h",
		dataIndex: "price_change_percentage_24h",
		title: "Price Change Percentage 24h",
		render(value) {
			return {
				props: {
					style: {
						color: value > 0 ? "green" : "red",
					},
				},
				children: value > 0 ? `+${value}` : value,
			};
		},
		width: 210,
	},
	{
		key: "total_volume",
		dataIndex: "total_volume",
		title: "Total Volume",
		render(value) {
			return formatCost(value);
		},
		width: 200,
		// fixed: "right",
	},
];

function Home() {
	const {data, isLoading} = useQuery({
		queryKey: ["ListCoin"],
		queryFn: async () => {
			return getCoinListWithMarketData({
				vs_currency: [
					"btc",
					"eth",
					"ltc",
					"bch",
					"bnb",
					"eos",
					"xrp",
					"xlm",
					"link",
					"dot",
					"yfi",
					"usd",
					"aed",
					"ars",
					"aud",
					"bdt",
					"bhd",
					"bmd",
					"brl",
					"cad",
					"chf",
					"clp",
					"cny",
					"czk",
					"dkk",
					"eur",
					"gbp",
					"gel",
					"hkd",
					"huf",
					"idr",
					"ils",
					"inr",
					"jpy",
					"krw",
					"kwd",
					"lkr",
					"mmk",
					"mxn",
					"myr",
					"ngn",
					"nok",
					"nzd",
					"php",
					"pkr",
					"pln",
					"rub",
					"sar",
					"sek",
					"sgd",
					"thb",
					"try",
					"twd",
					"uah",
					"vef",
					"vnd",
					"zar",
					"xdr",
					"xag",
					"xau",
					"bits",
					"sats",
				].toString(),
				category: "aave-tokens,aaccount-abstraction,layer-1",
			});
			// return fakeData;
		},
		// refetchInterval: 1000,
		retry: false,
		refetchOnMount: false,
	});

	const finalData = useMemo(() => {
		if (data) return data.data;
		return [];
	}, [data]);

	return (
		<LayoutContainer>
			<Table
				bordered
				size='small'
				loading={isLoading}
				columns={columns as any}
				dataSource={finalData}
				pagination={{
					size: "small",
					position: ["bottomCenter"],
					pageSize: 100,
					pageSizeOptions: [10, 20, 50, 100],
				}}
				scroll={{x: "max-content", y: "80vh"}}
			/>
		</LayoutContainer>
	);
}

export default Home;
