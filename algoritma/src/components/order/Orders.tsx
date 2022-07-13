import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { removeTable, restaurantState, selectRestaurant } from '../../redux/reducers/restaurant';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { restaurantStateTable } from '../../types/type';

export const Orders = () => {
    const { tables } = useAppSelector(selectRestaurant);
    const [orderData, setOrderData] = useState<restaurantStateTable[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const od = tables.slice().sort((a, b) => b.createdAt - a.createdAt);
        setOrderData(od)
    }, [tables])

    const showStatus = (status: boolean | null, index: number) => {
        const ft = orderData[index].orders.filter((o) => o.isDone === false);
        if (status === true && ft.length < 1) {
            return <span className='text-green-600 font-semibold'>Success</span>
        } else if (ft.length > 0) {
            return <span className='text-[#fe9705]'>Pending</span>
        } else if (status === null) {
            return <span className='text-red-600'>Canceled</span>
        }
    }

    return (
        <>
            <div className="lg:flex-[0_0_60%] mt-10 sm:mt-0 px-10 py-4">
                <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">View Orders</h3>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="relative mb-4 inline-block">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                autoComplete="status-name"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#176CA6] sm:text-sm"
                                onInvalid={() => {
                                    toast.error('Please do not leave the box empty!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }}
                                onChange={(e) => {
                                    switch (e.target.value) {
                                        case "Success":
                                            const query = tables.filter((o) => o.status === true);
                                            if (query) {
                                                setOrderData(query)
                                            }
                                            break;

                                        case "Pending":
                                            const queryTwo = tables.filter((o) => o.status === false);
                                            if (queryTwo) {
                                                setOrderData(queryTwo)
                                            }
                                            break;
                                        case "Canceled":
                                            const queryThree = tables.filter((o) => o.status === null);
                                            if (queryThree) {
                                                setOrderData(queryThree)
                                            }
                                            break;
                                        case "":
                                            const queryFour = tables;
                                            if (queryFour) {
                                                setOrderData(queryFour)
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                            >
                                <option value="">Select Filter</option>
                                <option value="Pending">Pending</option>
                                <option value="Success">Success</option>
                                <option value="Canceled">Canceled</option>
                            </select>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Row
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Table
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Waiter
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Read More
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderData.map((w, index) => {
                                            const date: any = new Date(w?.createdAt * 1000);
                                            let sum: number = 0;
                                            w.orders.forEach((e): void => {
                                                sum += e.price
                                            })
                                            return (
                                                <tr key={shortid.generate()} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                        {w.id}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {w.row}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {w.table}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {w.waiter}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {showStatus(w.status, index)}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {sum}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {date.toLocaleString("az", { dateStyle: "long", timeStyle: "short" })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Link to={`/order/detail/${w.id}`} className="px-2 py-1 bg-[#176CA6] text-white rounded-sm">Detail</Link>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button type='button' onClick={() => dispatch(removeTable(w.id))} className='flex justify-center text-white rounded-md items-center px-7 py-1 bg-[#176CA6]' color="error">
                                                            Delete Order
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
