import React, { SyntheticEvent, useEffect, useState } from 'react';
import { IEmployees, IRow, ITable } from '../../types/type';
import { getTable, getEmployee, getRow } from '../../utils/requests';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from '../../redux/reducers/restaurant';
import { restaurantStateTable } from '../../types/type';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

export const AddOrder = () => {
    const [tableData, setTableData] = useState<ITable[]>();
    const [rowData, setRowData] = useState<IRow[]>();
    const [employeeData, setEmployeeData] = useState<IEmployees[]>();
    const dispatch = useAppDispatch();
    const navigator = useNavigate();

    const getAllTable = async () => {
        const data = await getTable<ITable>();
        if (data) {
            setTableData(data);
        }
    }

    const getAllRow = async () => {
        const rd = await getRow<IRow>();
        if (rd) {
            setRowData(rd);
        }
    }

    const getAllEmployee = async () => {
        const ed = await getEmployee<IEmployees>();
        if (ed) {
            setEmployeeData(ed);
        }
    }

    const submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const tableId = shortid.generate();
        const tableValue = form["table"].value;
        const selectRow = form["row"].value;
        const waiter = form["employee"].value;

        const data: restaurantStateTable = {
            id: tableId,
            table: tableValue,
            row: selectRow,
            waiter: waiter,
            orders: [],
            createdAt: Math.round(new Date().getTime() / 1000),
            status: false
        }

        if (tableValue !== "" && selectRow !== "" && waiter !== "") {
            dispatch(createOrder(data));
            toast.success('The order was created successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            form["table"].value = "Select Table";
            form["row"].value = "Select Row";
            form["employee"].value = "Select Employee";
            navigator("/add-order", { state: { table: data.id } });
        } else {
            toast.error('Please fill in all fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        // next();
    }

    useEffect(() => {
        getAllTable();
        getAllRow();
        getAllEmployee();
    }, [])

    return (
        <>
            <div className="lg:flex-[0_0_40%] mt-10 sm:mt-0 px-10 py-4">
                <div className="md:grid md:grid-cols-1 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Order</h3>
                            {/* <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p> */}
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="" onSubmit={submit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-2 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Table
                                            </label>
                                            <select
                                                id="table"
                                                name="table"
                                                autoComplete="table-name"
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
                                            >
                                                <option value={""}>Select Table</option>
                                                {
                                                    tableData?.map((w) => (
                                                        <option key={w.id}>M {w.tableCode}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Row
                                            </label>
                                            <select
                                                id="row"
                                                name="row"
                                                autoComplete="row-name"
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
                                            >
                                                <option value={""}>Select Row</option>
                                                {
                                                    rowData?.map((r) => (
                                                        <option key={r.id}>S {r.rowItem}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Employee
                                            </label>
                                            <select
                                                id="employee"
                                                name="employee"
                                                autoComplete="employee-name"
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
                                            >
                                                <option value={""}>Select Employee</option>
                                                {
                                                    employeeData?.map((ed) => (
                                                        <option key={ed.id}>{ed.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#176CA6] hover:bg-[#175CA6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create Order
                                    </button>
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
