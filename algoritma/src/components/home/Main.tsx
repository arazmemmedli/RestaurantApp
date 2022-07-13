import React, { useEffect, useState } from 'react';
import { selectRestaurant } from '../../redux/reducers/restaurant';
import { useAppSelector } from '../../redux/hooks';

export const Main = () => {
  const { tables } = useAppSelector(selectRestaurant);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    let sum: number = 0;
    let ordersSum: number = 0;
    tables.forEach((e) => {
      ordersSum += e.orders.length;
      e.orders.forEach((e) => sum += e.price)
    })
    setTotalOrders(ordersSum)
    setTotalPrice(sum)
  }, [])

  return (
    <div className="block w-full relative px-10 py-3">
      <div className="mx-0 block">
        <div className="flex flex-row justify-start flex-wrap">
          <div className="lg:flex-[0_0_25%] flex-[0_0_100%] lg:max-w-[25%] max-w-[100%] px-[15px]">
            <div className="flex flex-col min-w-0 relative shadow-[0rem_0.3125rem_0.3125rem_0rem_rgb(82_63_105/5%)] h-[calc(100%-30px)] rounded-lg bg-white mb-7">
              <div className="flex-[1_1_auto] p-6">
                <div className="flex items-center p-0">
                  <span className='flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(47,76,221,0.1)] py-3 px-3 mr-4'>
                    <img src="/images/checkout.png" className='w-9 object-cover' alt="Orders" />
                  </span>
                  <div className="flex-[1]">
                    <h3 className='text-4xl font-semibold leading-tight text-black'>{totalOrders}</h3>
                    <p className='text-sm text-[#7e7e7e] font-medium uppercase'>Total Orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex-[0_0_25%] flex-[0_0_100%] lg:max-w-[25%] max-w-[100%] px-[15px]">
            <div className="flex flex-col min-w-0 relative shadow-[0rem_0.3125rem_0.3125rem_0rem_rgb(82_63_105/5%)] h-[calc(100%-30px)] rounded-lg bg-white mb-7">
              <div className="flex-[1_1_auto] p-6">
                <div className="flex items-center p-0">
                  <span className='flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(47,76,221,0.1)] py-3 px-3 mr-4'>
                    <img src="/images/manat.png" className='w-9 object-cover' alt="Succuss Order" />
                  </span>
                  <div className="flex-[1]">
                    <h3 className='text-4xl font-semibold leading-tight text-black'>{totalPrice} AZN</h3>
                    <p className='text-sm text-[#7e7e7e] font-medium uppercase'>Total Revenue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}