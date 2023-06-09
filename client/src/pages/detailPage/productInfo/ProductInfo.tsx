import React from 'react'
import { ProductDetail } from '../../../interfaces/interfaces'

const ProductInfo:React.FC<{productDetail:ProductDetail}> = ({productDetail}) => {
    const {infoProduct,description}=productDetail
  return (
    <div>  <div className="my-5 bg-white rounded-sm  px-6 py-4">
    <h1 className="text-xl font-semibold">Thông tin chi tiết</h1>
    <table className="w-full my-3 rounded-sm">
        {infoProduct.map((e) => (
            <tbody className=" h-[40px] bg-primary-bg">
                <td className="text-sm w-2/12 px-2 bg-[rgb(239,239,239)] ">{e.name}</td>
                <td className="text-sm w-10/12 px-3 ">{e.value}</td>
            </tbody>
        ))}
    </table>
</div>
<div className="my-5 bg-white rounded-sm px-6 py-4">
    <h1 className="text-xl  font-normal">MÔ TẢ SẢN PHẨM</h1>
    <ul className="flex flex-col gap-1  mt-3">
        {description?.map((item) => (
            <li className={`${item === item.toUpperCase() ? 'font-semibold text-base ' : 'text-sm'}`}>
                {item}
            </li>
        ))}
    </ul>
</div></div>
  )
}

export default ProductInfo