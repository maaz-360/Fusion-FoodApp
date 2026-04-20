import { ORDER_STATUS_OPTIONS } from "./constant";

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-us",{
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
})};

export const getOrderStatusColor =(status)=>{
    const statusOption = ORDER_STATUS_OPTIONS.find((opt) => opt.value === status);
    return statusOption ? statusOption.color : "secondary";
}