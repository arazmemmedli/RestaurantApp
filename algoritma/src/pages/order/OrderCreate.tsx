import React, { useState } from 'react';
import { AddOrder, AddOrderStep2 } from "../../export/export";
import { useLocation } from 'react-router-dom';

export const OrderCreate = () => {
    const location = useLocation();

    const show = () => {
        switch (location.pathname) {
            case "/create-order":
                return <AddOrder />
                break;

            case "/add-order":
                return <AddOrderStep2 />
                break
            default:
                break;
        }
    }

    return (
        <>
            {show()}
        </>
    )
}
