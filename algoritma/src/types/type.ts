export interface ITable {
    id: number;
    tableCode: number;
}

export interface IEmployees {
    id: number;
    name: string;
}

export interface IRow {
    id: number;
    rowItem: number;
}

export interface IProduct {
    id: string;
    name: string;
    price: number;
    amount: number;
    waitingPeriod: number;
}

export interface restaurantStateTable {
    id: string;
    table: string;
    row: string;
    waiter: string;
    orders: restaurantStateOrder[];
    createdAt: number;
    status: boolean | null;
}

export interface restaurantStateOrder {
    id: string;
    productName: string;
    price: number;
    amount: number;
    createdAt: number;
    isDone: boolean;
    waitingPeriod: number;
}