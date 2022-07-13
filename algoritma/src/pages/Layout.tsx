import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../export/export";

export const Layout = () => {
    return (
        <div className="w-full">
            <Header />
            <section className="bg-[#f1f1f1] relative h-[calc(100vh-172px)] block">
                <div className="w-full mx-auto px-[15px]">
                    <div className="flex flex-wrap  mx-[-15px]">
                        <Outlet />
                    </div>
                </div>
            </section>
        </div>
    );
};