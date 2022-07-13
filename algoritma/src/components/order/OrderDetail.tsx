import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { canceledOrder, completeOrder, removeOrder, selectRestaurant } from '../../redux/reducers/restaurant';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { restaurantStateOrder } from '../../types/type';
import shortid from 'shortid';

export const OrderDetail = () => {
    const datas = useAppSelector(selectRestaurant);
    const { id } = useParams();
    const [detailData, setDetailData] = useState<restaurantStateOrder[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const dispatch = useAppDispatch();

    const getData = () => {
        if (id) {
            const qd = datas.tables.find((t) => t.id === id);
            if (qd) {
                const odd = qd.orders.slice().sort((a, b) => b.createdAt - a.createdAt);
                setDetailData(odd);
            }
        }
    }

    useEffect(() => {
        getData();
    }, [datas])

    useEffect(() => {
        if (detailData) {
            let sum: number = 0;
            detailData.forEach((w) => (sum += w.price));
            setTotalPrice(sum);
        }
    }, [detailData])

    const deleteOrder = (orderId: string) => {
        if (id) {
            dispatch(removeOrder({ orderId, table: id }))
        }
    }

    const orderComplete = () => {
        if (id) {
            dispatch(completeOrder(id))
        }
    }

    return (
        <div className="lg:flex-[0_0_60%] mt-10 sm:mt-0 px-10 py-4">
            <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">View Orders</h3>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Say
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Order Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Waiting Period
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Cancel Order
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detailData.map((w, index) => {
                                        const date: any = new Date(w?.createdAt * 1000)
                                        return (
                                            <tr key={shortid.generate()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                    {index += 1}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {w.productName}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {w.amount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {w.price} AZN
                                                </td>
                                                <td className="px-6 py-4">
                                                    {date.toLocaleString("az", { timeStyle: "short" })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`${w.isDone === false ? "text-[#fe9705]" : "text-green-600"} font-semibold`}>{w.isDone === false ? w.waitingPeriod : 0} deg</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-block px-2 py-1 ${w.isDone === false ? "bg-[#fe9705]" : "bg-green-600"} text-white rounded-sm`}>{w.isDone === false ? "Pending" : "Success"}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button type='button' onClick={() => deleteOrder(w.id)} className='flex justify-center text-white rounded-md items-center px-7 py-1 bg-[#176CA6]' color="error">
                                                        Cancel
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
                <div className="md:col-span-1">
                    <div className="flex justify-between w-full">
                        <div className="px-4 sm:px-2 flex items-center">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Total Price:</h3>
                            <p className='text-lg font-semibold ml-2'>{totalPrice} AZN</p>
                        </div>
                        <div className="px-4 sm:px-2">
                            <Link to='/add-order' state={{ table: id }} className='flex justify-center text-white rounded-md items-center px-7 py-1 bg-[#176CA6]' color="error">
                                Add Order
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    detailData.length > 0 ? <div className="md:col-span-2">
                        <div className="flex justify-between w-full">
                            <div className="px-4 sm:px-2">
                                <button type='button' onClick={orderComplete} className='flex justify-center text-white rounded-md items-center px-7 py-1 bg-[#176CA6]' color="error">
                                    Complete Order
                                </button>
                            </div>
                        </div>
                    </div> : <div className="md:col-span-2">
                        <div className="flex justify-between w-full">
                            <div className="px-4 sm:px-2">
                                <button type='button' onClick={() => {
                                    if (id) {
                                        dispatch(canceledOrder(id))
                                    }
                                }} className='flex justify-center text-white rounded-md items-center px-7 py-1 bg-[#176CA6]' color="error">
                                    Canceled Order
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
