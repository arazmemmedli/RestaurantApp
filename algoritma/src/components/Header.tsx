import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutIcon } from '@heroicons/react/solid';

const navigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Orders', href: '/orders', current: false },
    { name: 'Create Order', href: '/create-order', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}


export const Header = () => {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/login");
        window.location.reload();
    }
    return (
        <div className="block min-w-full">
            <div className="bg-gray-800">
                <div className="px-4 sm:px-6 lg:px-10 py-3">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link to={"/"} className="inline-block">
                                    <img
                                        className="object-cover"
                                        src="/images/logo-dark.png"
                                        alt="Dashboard logo"
                                    />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {
                                        navigation.map((item) => (
                                            <Link to={item.href} key={item.name} className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )} aria-current={item.current ? 'page' : undefined} >
                                                {item.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button type='button' className='flex items-center gap-3' onClick={logout}>
                                    <span className='inline-block w-7 text-[#176CA6]'><LogoutIcon color='#176CA6' /></span>
                                    <span className='text-sm font-medium text-[#fff]'>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className="bg-white shadow">
                <div className="py-6 px-4 sm:px-6 lg:px-10">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
        </div>
    )
}