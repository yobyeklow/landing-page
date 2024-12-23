import { useQuery } from "@tanstack/react-query";
import { getCurrenciesList } from "../apis/coins";
import { Form, Select } from "antd";
import { useMemo } from "react";

function SelectCurrencies() {
    const { data, isLoading } = useQuery({
        queryKey: ["currencies_coin"],
        queryFn: getCurrenciesList,
        retry: false,
        refetchOnMount: false,
    });

    const finalOptions = useMemo(() => {
        if (data) {
            return data.data.map((val: string) => ({ value: val, label: val }));
        }
        return [];
    }, [data]);

    return (
        <Form.Item name="vs_currency">
            <Select
                showSearch
                loading={isLoading}
                options={finalOptions}
                style={{ width: 100 }}
                placeholder="Currency"
            />
        </Form.Item>
    );
}

export default SelectCurrencies;
