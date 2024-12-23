import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Form,
    Image,
    Input,
    Layout,
    Space,
    Table,
    Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { getCoinListWithMarketData } from "../../apis/coins";
import SelectCategory from "../../components/SelectCategory";
import SelectCurrencies from "../../components/SelectCurrencies";
import { CoinMarket, ParamsCoinMarket } from "../../interfaces";
import { formatCost } from "../../utils";
import { defaultIds } from "../../constants";
import { Header } from "antd/es/layout/layout";

const LayoutContainer = styled(Layout)`
    height: 100vh;
    display: flex;
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
        render(_, { name, image }) {
            return (
                <Space>
                    <Image src={image} width="24px" /> <div>{name}</div>
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
                children:
                    value > 0 ? `+${formatCost(value)}` : formatCost(value),
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
    },
];

function Home() {
    const [params, setParams] = useState<ParamsCoinMarket>({});

    const { data, isLoading } = useQuery({
        queryKey: ["ListCoin", params],
        queryFn: async ({ queryKey }) => {
            const params = queryKey[1] as ParamsCoinMarket;
            const ids = params.ids ? params.ids : defaultIds;
            return getCoinListWithMarketData({
                vs_currency: "usd",
                ...params,
                ids,
            });
        },
        refetchInterval: 30000, // 5m
        retry: false,
        refetchOnMount: false,
    });

    const finalData = useMemo(() => {
        if (data) return data.data;
        return [];
    }, [data]);

    return (
        <LayoutContainer>
            <Header
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#26d962",
                    position: "sticky",
                    top: 0,
                    zIndex: 999,
                    width: "100%",
                    boxShadow: "1px 5px 2px -4px rgba(69,145,79,1)",
                    height: "50px",
                }}
            >
                <Typography
                    style={{
                        fontWeight: 600,
                        fontSize: "1.6rem",
                        color: "white",
                    }}
                >
                    OBOT AI AGENT
                </Typography>
            </Header>
            <Layout
                style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px",
                    backgroundColor: "white",
                }}
            >
                <Space
                    style={{
                        padding: "5px",
                        border: "1px solid #f0f0f0",
                        borderBottom: "unset",
                    }}
                >
                    <Form
                        layout="inline"
                        onFinish={(value) => {
                            setParams(value);
                        }}
                    >
                        <Form.Item name="ids">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <SelectCurrencies />
                        <SelectCategory />
                        <Form.Item>
                            <Button htmlType="submit">Search</Button>
                        </Form.Item>
                    </Form>
                </Space>
                <Table
                    bordered
                    size="small"
                    loading={isLoading}
                    columns={columns as any}
                    dataSource={finalData}
                    pagination={{
                        size: "small",
                        position: ["bottomCenter"],
                        pageSize: 50,
                        pageSizeOptions: [10, 20, 50, 100],
                    }}
                    scroll={{ x: "max-content", y: "80vh" }}
                />
            </Layout>
        </LayoutContainer>
    );
}

export default Home;
