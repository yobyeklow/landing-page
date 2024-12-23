import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";
import { useMemo } from "react";
import { getCategoryList } from "../apis/coins";

function SelectCategory() {
    const { data, isLoading } = useQuery({
        queryKey: ["category_coin"],
        queryFn: getCategoryList,
        retry: false,
        refetchOnMount: false,
    });

    const finalOptions = useMemo(() => {
        if (data) {
            return data.data.map((val: any) => ({
                value: val.category_id,
                label: val.name,
            }));
        }
        return [];
    }, [data]);

    return (
        <Form.Item name="category">
            <Select
                loading={isLoading}
                options={finalOptions}
                style={{ width: 210 }}
                placeholder="Category"
            />
        </Form.Item>
    );
}

export default SelectCategory;
