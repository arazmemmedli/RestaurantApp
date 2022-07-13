import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { IProduct, restaurantStateOrder } from '../../types/type';
import { getProduct } from '../../utils/requests';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import { ToastContainer, toast } from 'react-toastify';
import { addOrder } from '../../redux/reducers/restaurant';

import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../redux/hooks';

interface ILocationState {
    table: string;
}

export const AddOrderStep2 = () => {
    const location = useLocation();
    const [productData, setProductData] = useState<IProduct[]>([]);
    const { table } = location.state as ILocationState;
    const [price, setPrice] = useState<number>(0);
    const [selectPrice, setSelectPrice] = useState<number>(0);
    const [inputs, setInputs] = useState<restaurantStateOrder[]>([
        {
            id: uniqid(),
            productName: "",
            price: 0,
            amount: 0,
            createdAt: Math.round(new Date().getTime() / 1000),
            isDone: false,
            waitingPeriod: 0
        }
    ])
    const dispatch = useAppDispatch();

    const getAllProduct = async () => {
        const pd = await getProduct<IProduct>();
        if (pd) {
            setProductData(pd);
        }
    }

    const addNewOrder = () => {
        setInputs([...inputs, {
            id: uniqid(),
            productName: "",
            price: 0,
            amount: 0,
            createdAt: Math.round(new Date().getTime() / 1000),
            isDone: false,
            waitingPeriod: 0
        }])
    }

    const deleteOrder = (id: string) => {
        setInputs(inputs.filter(s => s.id !== id));
    }

    const updateOrderProduct = (id: string, productName: string, index: number) => {
        const selectProduct = productData.find((w) => w.name === productName);
        const selectProductAmount = inputs[index].amount;
        let sp: number;
        let wp: number;
        if (selectProduct) {
            setSelectPrice(selectProduct.price);
            sp = selectProductAmount === 0 ? selectProduct.price : selectProduct.price * selectProductAmount;
            wp = selectProduct.waitingPeriod;
        }
        setInputs(inputs.map(s => s.id === id ? { ...s, productName: productName, price: sp, waitingPeriod: wp } : s));
    }

    const updateOrderAmount = (id: string, amount: string, index: number) => {
        const selectProductPrice = inputs[index].price;
        const selectProductName = inputs[index].productName;
        const selectProduct = productData.find((w) => w.name === selectProductName);
        if (!selectProduct) return;
        let sprice: number;
        if (amount !== "") {
            sprice = Number(amount) * selectProductPrice;
        } else {
            sprice = selectProduct.price;
        }
        setInputs(inputs.map(s => s.id === id ? { ...s, amount: Number(amount), price: sprice } : s))
    }

    const submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(addOrder({ inputs, table }));
        toast.success('The order was created successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setInputs([
            {
                id: uniqid(),
                productName: "",
                price: 0,
                amount: 0,
                createdAt: 0,
                isDone: false,
                waitingPeriod: 0
            }
        ])
    }

    useEffect(() => {
        getAllProduct();
    }, [])

    return (
        <>
            <div className="lg:flex-[0_0_50%] mt-10 sm:mt-0 px-10 py-4">
                <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Order</h3>
                            {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST" onSubmit={submit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    {
                                        inputs.map((input, index) => {
                                            return (
                                                <div className="grid grid-cols-4 gap-6 mb-3" key={input.id}>

                                                    <div className="col-span-3 sm:col-span-1">
                                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                            Product
                                                        </label>
                                                        <select
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
                                                            id="product"
                                                            name="product"
                                                            required
                                                            autoComplete="product-name"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#176CA6] sm:text-sm"
                                                            onChange={(e) => updateOrderProduct(input.id, e.target.value, index)}
                                                        >
                                                            <option value="">Select Product</option>
                                                            {
                                                                productData?.map((w) => (
                                                                    <option key={w.id} value={w.name}>{w.name}</option>

                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="col-span-3 sm:col-span-1">
                                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                            Quantity
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            id="quantity"
                                                            required
                                                            autoComplete="quantity-name"
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            onChange={(e) => updateOrderAmount(input.id, e.target.value, index)}
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
                                                        />
                                                    </div>

                                                    <div className='col-span-3 sm:col-span-1'>
                                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                                        <div className="mt-1 flex rounded-md">
                                                            <div className="space-y-1 text-center">
                                                                <p className="text-base text-gray-500 font-bold">{input.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-span-3 sm:col-span-1 flex justify-center items-center'>
                                                        {index !== 0 && <button type='button' className='flex justify-center text-white rounded-md items-center px-7 py-1 bg-[#176CA6]' color="error" onClick={() => deleteOrder(input.id)}>
                                                            Delete
                                                        </button>}
                                                    </div>


                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex justify-between px-4 sm:px-6 py-3 bg-gray-50 ">
                                    <div className="inline-block">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#176CA6] hover:bg-[#175CA6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Create Order
                                        </button>
                                    </div>
                                    <div className="inline-block">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#176CA6] hover:bg-[#175CA6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={addNewOrder}
                                        >
                                            +Add More Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
