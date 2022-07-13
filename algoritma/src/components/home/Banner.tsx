import React from 'react';

export const Banner = () => {
    return (
        <div className='relative w-full h-[40rem]'>
            <div className="block w-full h-full">
                <div style={{ backgroundImage: `url(/images/restaurant.jpg)` }} className="h-[100%] relative pt-[200px] pb-[50px] px-0 bg-cover w-full bg-[center_center] bg-no-repeat box-border z-[1] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:bg-[#000] before:opacity-[0.3] after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[rgba(0,0,0,0.3)]">
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full max-w-[1170px] relative top-1/2 -translate-y-1/2 px-[15px] z-[2]">
                    <div className="relative w-full px-[15px] lg:max-w-[75%] md:max-w-[75%]">
                        <div className="text-white">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Welcome to</span>{' '}
                                <span className="block text-[#176CA6] xl:inline">Algoritma</span>
                            </h1>
                            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                                fugiat veniam occaecat fugiat aliqua.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
