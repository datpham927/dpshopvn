import React from 'react';
import Left from './Left';
import Right from './Right';
import { useAppSelector } from '../../../redux/hooks';
import { imgCartEmpty } from '../../../assets';
import ButtonOutline from '../../../component/buttonOutline';
import { path } from '../../../utils/const';
import { useNavigate } from 'react-router-dom';
import Seo from '../../../component/seo';

const CartPage: React.FC = () => {
    const { productInCart } = useAppSelector((state) => state.order);
    const navigate = useNavigate();
    return (
        <div className="w-full h-full">
            <Seo description='Shop bách hóa' title='DPSHOPVN' key={2} />
            <h1 className="py-4 text-2xl">Giỏ hàng</h1>
            {productInCart?.length > 0 ? (
                <div className="flex tablet:flex-col pb-8 gap-2">
                    <Left />
                    <Right />
                </div>
            ) : (
                <div className="flex flex-col items-center w-full h-full py-6 bg-white rounded-md mb-10">
                    <img src={imgCartEmpty} className="w-[190px] h-[160px]" />
                    <h3 className="text-base text-secondary my-2">Không có sản phẩm nào trong giỏ hàng của bạn.</h3>
                    <ButtonOutline className="mt-2 px-8" onClick={() => navigate(path.HOME)}>
                        Tiếp tục mua sắm
                    </ButtonOutline>
                </div>
            )}
        </div>
    );
};

export default CartPage;
