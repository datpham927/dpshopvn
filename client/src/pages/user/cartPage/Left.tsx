import React, { memo, useMemo } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import {
    setProductsByShopId,
    setRemoveProductInCart,
    setSelectedProductsAll,
} from '../../../redux/features/order/orderSlice';
import { ProductInCartItem, showNotification } from '../../../component';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { apiDeleteProductInCart } from '../../../services/apiCart';

const Left: React.FC = () => {
    const { productInCart } = useAppSelector((state) => state.order);
    const { selectedProducts } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();

    const totalPriceMemo = useMemo(() => {
        const result = selectedProducts.reduce((total, e) => {
            return total + e?.totalPrice;
        }, 0);
        return result;
    }, [selectedProducts]);

    const handleDeleteSelectorProduct = async () => {
        if (confirm('Bạn có muốn xóa tất cả sản phẩm đã chọn?')) {
            await Promise.all(
                selectedProducts.map((p) => {
                    dispatch(setRemoveProductInCart(p));
                    return apiDeleteProductInCart(p?._id);
                }),
            );
            showNotification('Xóa thành công', true);
        }
    };

    return (
        <div className="tablet:w-full w-4/6 relative">
            <div className="flex flex-col gap-2 sticky top-0 left-0 bg-background_primary py-3 ">
                <div className="bg-white p-2">
                    <Stepper
                        activeStep={
                            totalPriceMemo < 599000 && totalPriceMemo > 99000 ? 2 : totalPriceMemo < 99000 ? 0 : 3
                        }
                    >
                        <Step key={1}>
                            <StepLabel>Mua</StepLabel>
                        </Step>
                        <Step key={2}>
                            <StepLabel>Freeship 15K</StepLabel>
                        </Step>
                        <Step key={3}>
                            <StepLabel>Freeship 30K</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg overflow-hidden">
                    <div className="w-[40%] flex gap-1">
                        <input
                            className="cursor-pointer"
                            type="checkbox"
                            checked={selectedProducts.length === productInCart.length}
                            onChange={() => {
                                dispatch(setSelectedProductsAll(productInCart));
                                dispatch(setProductsByShopId());
                            }}
                        />
                        <span className="text-sm text-secondary ml-1">Tất cả ({productInCart?.length} sản phẩm)</span>
                    </div>
                    <div className="tablet:hidden w-[60%] grid grid-cols-4 text-center">
                        <span className="text-sm text-secondary">Đơn giá</span>
                        <span className="text-sm text-secondary">Số lượng</span>
                        <span className="text-sm text-secondary">Thành tiền</span>
                        <span className="text-sm text-secondary cursor-pointer" onClick={handleDeleteSelectorProduct}>
                            Xóa
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-sm overflow-hidden">
                {productInCart?.map((e) => (
                    <ProductInCartItem product={e} isSelector />
                ))}
            </div>
        </div>
    );
};

export default memo(Left);
