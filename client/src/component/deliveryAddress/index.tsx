import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { formatUserName } from '../../utils/formatUserName';
import { FormEditAddress } from '..';

const DeliveryAddress:React.FC = () => {
    const currentUser = useAppSelector((state) => state.user);
    const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false);

    return (
        <>
            <div className="bg-white px-4 py-2 rounded-md overflow-hidden">
                <div className="flex justify-between">
                    <h2 className="text-lg text-secondary">Giao tới</h2>
                    <span className="text-base text-primary cursor-pointer" onClick={() => setIsOpenEditAddress(true)}>
                        Thay đổi
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-semibold border-r-[2px]  border-solid border-gray-200 pr-2">
                        {formatUserName(currentUser)}
                    </p>
                    <p className="text-sm font-semibold">{currentUser.mobile}</p>
                </div>
                <div className="flex shrink-0 w-full gap-1">
                    <span className="text-sm text-secondary">{currentUser.address}</span>
                </div>
            </div>
            {isOpenEditAddress && <FormEditAddress payload={currentUser} setIsOpen={setIsOpenEditAddress} isEdit />}
        </>
    );
};

export default DeliveryAddress;
