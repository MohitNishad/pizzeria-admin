import { OrderColumns } from "@/data/order-table";
import {
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { useOrders } from "./hooks/useOrders";
import * as dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { OrderStatusEnum } from "./schema";
import { useUpdateOrderStatus } from "./hooks/useUpdateOrderStatus";
import ClImage from "../commponents/ClImage";
import { TGetOrderSchema } from "./schema";
import AppPagination from "../commponents/AppPagination";
import { TableLoader } from "../loaders";

interface Props {}

function Orders({}: Props) {
    const { data, isLoading, isError } = useOrders();
    const [limit, setLimit] = useState("10");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        setPages(data?.pages || 1);
    }, [data]);

    return (
        <div>
            <Table
                isHeaderSticky
                radius="sm"
                aria-label="category table"
                layout="auto"
                classNames={{
                    table: `${isLoading && "h-[500px]"}`,
                    base: `max-h-[600px]`,
                }}
            >
                <TableHeader>
                    {OrderColumns.map((col) => (
                        <TableColumn key={col.id}>{col.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody
                    emptyContent={
                        !isLoading &&
                        (isError
                            ? "Some server error occured ❌"
                            : "No orders found")
                    }
                    isLoading={isLoading}
                    loadingContent={<TableLoader />}
                >
                    {(data?.orders || []).map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <ClImage imageId={item.image} />
                            </TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>
                                <OrderSelector order={item} />
                            </TableCell>
                            <TableCell>{item.user_full_name}</TableCell>
                            <TableCell>{item.state}</TableCell>
                            <TableCell>{item.city}</TableCell>
                            <TableCell>
                                {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AppPagination
                totalPages={pages}
                page={page}
                setPage={setPage}
                setSelected={setLimit}
                selected={limit}
            />
        </div>
    );
}

export default Orders;

function OrderSelector({
    order,
}: {
    order: TGetOrderSchema["data"]["orders"][0];
}) {
    const { mutate } = useUpdateOrderStatus();
    const [selected, setSelected] = useState(`${order.status}`);

    const keys = useMemo(() => {
        const orderStatuses = Object.values(OrderStatusEnum);
        const currentIndex = orderStatuses.indexOf(order.status);
        return orderStatuses.slice(0, currentIndex);
    }, []);

    const [disabled, setDisabled] = useState<Array<string>>(keys);

    function handleOnChange(data: string) {
        setDisabled((prev) => [...prev, selected]);
        setSelected(data);
        mutate({ id: order.id, data: data });
    }

    return (
        <Select
            className="w-[140px]"
            color="primary"
            aria-label="order status changer"
            isDisabled={selected === OrderStatusEnum.COMPLETE}
            defaultSelectedKeys={[order.status]}
            disabledKeys={disabled}
            size="sm"
            radius="sm"
            variant="faded"
            onChange={(e) => handleOnChange(e.target.value)}
            classNames={{
                selectorIcon: "text-primaryOrange",
                base: "p-0 h-[40px]",
                innerWrapper: "p-0 ",
                mainWrapper: "p-0 h-[40px]",
                label: "font-bold",
            }}
        >
            <SelectItem
                key={OrderStatusEnum.PLACED}
                value={OrderStatusEnum.PLACED}
            >
                Placed
            </SelectItem>
            <SelectItem
                key={OrderStatusEnum.PREPARING}
                value={OrderStatusEnum.PREPARING}
            >
                Preparing
            </SelectItem>
            <SelectItem
                key={OrderStatusEnum.OUTFORDELIVERY}
                value={OrderStatusEnum.OUTFORDELIVERY}
            >
                Out For Delivery
            </SelectItem>
            <SelectItem
                key={OrderStatusEnum.COMPLETE}
                value={OrderStatusEnum.COMPLETE}
            >
                Complete
            </SelectItem>
        </Select>
    );
}
