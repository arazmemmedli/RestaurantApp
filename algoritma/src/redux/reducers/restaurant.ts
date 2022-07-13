import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { restaurantStateOrder, restaurantStateTable } from "../../types/type";
import { ToastContainer, toast } from 'react-toastify';

export interface restaurantState {
    tables: restaurantStateTable[]
}

const initialState: restaurantState = {
    tables: [],
}

export const restaurantSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
        createOrder: (state: restaurantState, action: { payload: restaurantStateTable }) => {
            if (action.payload !== undefined) {
                const tables = state.tables.find((t) => t.table === action.payload.table && t.row === action.payload.row && t.waiter === action.payload.waiter);
                if (!tables) {
                    state.tables.push(action.payload);
                } else {
                    alert("This table has exist!")
                }
            }
        },
        addOrder: (state: restaurantState, action: { payload: { inputs: restaurantStateOrder[], table: string } }) => {
            if (action.payload !== undefined) {
                const table = state.tables.find((s) => s.id === action.payload.table);
                if (table) {
                    table.orders.push(...action.payload.inputs);
                }
            }
        },
        removeOrder: (state: restaurantState, action: { payload: { orderId: string, table: string } }) => {
            if (action.payload !== undefined) {
                const table = state.tables.find((t) => t.id === action.payload.table);
                if (table) {
                    table.orders = table.orders.filter((order) => order.id !== action.payload.orderId)
                }
            }
        },
        removeTable: (state: restaurantState, action: { payload: string }) => {
            if (action.payload !== undefined) {
                state.tables = state.tables.filter((t) => t.id !== action.payload)
            }
        },
        completeOrder: (state: restaurantState, action: { payload: string }) => {
            if (action.payload !== undefined) {
                const table = state.tables.find((t) => t.id === action.payload);
                if (table) {
                    table.status = true;
                    const updateOrders = table.orders.map((o) => ({ ...o, isDone: true }));
                    table.orders = updateOrders
                }
            }
        },
        canceledOrder: (state: restaurantState, action: { payload: string }) => {
            if (action.payload !== undefined) {
                const table = state.tables.find((t) => t.id === action.payload);
                if (table) {
                    table.status = null;
                }
            }
        }
    }
})

export const { createOrder, addOrder, removeOrder, completeOrder, canceledOrder,removeTable } = restaurantSlice.actions;

export const selectRestaurant = (state: RootState) => state.restaurant;

export default restaurantSlice.reducer;