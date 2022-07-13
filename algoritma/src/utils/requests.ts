import axios from "axios";
import { ITable } from "../types/type";
const BASE_URL = "http://localhost:3004/";

export const requests = {
    fetchTable: `${BASE_URL}table`,
    fetchEmployees: `${BASE_URL}employees`,
    fetchRow: `${BASE_URL}row`,
    fetchProduct: `${BASE_URL}product`,
}

export async function getTable<DataType>() {
    try {
        const req = await axios.get(requests.fetchTable);
        return req.data as DataType[]
    } catch (error) {
        console.log(error);
    }
}

export async function getRow<DataType>() {
    try {
        const req = await axios.get(requests.fetchRow);
        return req.data as DataType[];
    } catch (error) {
        console.log(error);
    }
}

export async function getEmployee<DataType>() {
    try {
        const req = await axios.get(requests.fetchEmployees);
        return req.data as DataType[]
    } catch (error) {
        console.log(error);
    }
}

export async function getProduct<DataType>() {
    try {
        const req = await axios.get(requests.fetchProduct);
        return req.data as DataType[]
    } catch (error) {
        console.log(error);
    }
}