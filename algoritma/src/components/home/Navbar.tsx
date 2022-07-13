import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillGridFill } from 'react-icons/bs';

const navigation = [
    { name: 'Dashboard', current: true },
    { name: 'Orders', current: false },
    { name: 'Create Order', current: false },
]

export const Navbar = () => {

    const slugify = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

    return (
        <div className="block min-w-full">
            <div className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="object-cover"
                                    src="/images/logo-dark.png"
                                    alt="Dashboard logo"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {
                                        navigation.map((item) => (
                                            <Link to={slugify(item.name)} key={item.name} className={`${item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} px-3 py-2 rounded-md text-sm font-medium`}>
                                                {item.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}