import axios from "axios";
import IDataList from "../models/IDataList";

export const getItemsData = () => {
    return axios.get<IDataList[]>('http://localhost:4000/items').then((response) => response.data);
}

export const pushData = (newExpense: Omit<IDataList, "id">) => {
    return axios.post<IDataList>('http://localhost:4000/items', newExpense).then((response) => response.data);
}