import { useMemo, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import {
    setDecreaseProduct,
    setIncreaseProduct,
    setRemoveProductInCart,
    setSelectedProducts,
    setSelectedProductsALl,
} from '../../../../redux/features/order/orderSlice';
import { ProductInCart } from '../../../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { IconExcept } from '../../../../assets';
function CartPage() {
    const dispatch = useAppDispatch();
    const { productInCart } = useAppSelector((state) => state.order);
    const { selectedProducts } = useAppSelector((state) => state.order);
    //   const selectedProducts = orderProducts.orderItemsSelector?.map(
    //     (e) => e.product
    //   );

    // const priceMemo = useMemo(() => {
    //   const result = orderProducts.orderItemsSelector.reduce((total, e) => {
    //     return total + e.price * e.amount;
    //   }, 0);
    //   return result;
    // }, [orderProducts]);
    //       const totalPriceMemo = useMemo(() => {
    //   if (priceMemo > 10000000) {
    //     return priceMemo - (priceMemo * 5) / 100;
    //   }
    //   return 0;
    // }, [priceMemo]);

    //   const handleAddOrder = () => {
    //     navigate("/payment", {
    //       state: {
    //         totalPrice: totalPriceMemo,
    //       },
    //     });
    //   };

    const handleDeleteProductInCart = (product: ProductInCart) => {
        if (confirm('Bạn có muốn xóa sản phẩm đang chọn?')) {
            dispatch(setRemoveProductInCart(product));
        }
    };

    return (
        <div className="flex px-20 py-8">
            <div className="w-4/6">
                <div className="flex  bg-white p-3 rounded-lg">
                    <div className="w-[40%] flex">
                        <input
                            type="checkbox"
                            checked={selectedProducts.length === productInCart.length}
                            onChange={() => dispatch(setSelectedProductsALl(productInCart))}
                        />
                        <span className="ml-1">Tất cả ({productInCart?.length} sản phẩm)</span>
                    </div>
                    <div className="w-[60%] grid grid-cols-4 text-center">
                        <span>Đơn giá</span>
                        <span>Số lượng</span>
                        <span>Thành tiền</span>
                        <span className="cursor-pointer">Xóa</span>
                    </div>
                </div>
                {/* ------------ */}
                <div>
                    {productInCart?.map((e) => (
                        <div className="flex  bg-white p-3 justify-between rounded-lg mt-3 items-center">
                            <div className="w-[40%] flex gap-2">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.some((i) => i._id === e?._id)}
                                    onChange={() => dispatch(setSelectedProducts(e))}
                                />
                                <img className="ml-1 h-[50px] w-[50px] object-cover mx-2" src={e?.image_url} alt="" />
                                <span className="w-[70%] truncate">{e?.title}</span>
                            </div>
                            <div className="w-[60%] grid grid-cols-4 text-center">
                                <span>{e?.unitPrice}</span>
                                <div className="flex border-solid  border-[1px] border-primary w-fit ">
                                    <span onClick={() => dispatch(setDecreaseProduct(e))}>{IconExcept}</span>
                                    <span className="mx-4">{e.quantity}</span>
                                    <span onClick={() => dispatch(setIncreaseProduct(e))}>
                                        <AddIcon />
                                    </span>
                                </div>
                                <span>{e?.totalPrice}</span>
                                <span className="cursor-pointer" onClick={() => handleDeleteProductInCart(e)}>
                                    <DeleteOutlineOutlinedIcon />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="w-2/6 pl-5">
        <div className="bg-white p-3">
          <div className="flex justify-between items-center">
            <span>Tạm Tính</span>
            <span>{priceMemo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Giảm giá</span>
            <span>{priceMemo > 10000000 ? "5%" : "0"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Thuế</span>
            <span>0</span>
          </div>
        </div>
        <div className="flex bg-white p-3 justify-between items-center mt-1">
          <span>Tổng Tiền</span>
          <span className="text-lg text-red font-semibold">
            {totalPriceMemo} VND
          </span>
        </div>
        <div
          className="w-[60%] mt-3 py-1 rounded-sm flex justify-center mx-auto bg-red text-white font-normal"
          onClick={handleAddOrder}
        >
          Mua hàng
        </div>
      </div> */}
        </div>
    );
}

export default CartPage;
