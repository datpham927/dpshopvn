import React, { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import ButtonOutline from '../../../../component/buttonOutline';
import { UserProfile as IUserProfile } from '../../../../interfaces/interfaces';
import { apiUpdateUser } from '../../../../services/apiUser';
import { setDetailUser } from '../../../../redux/features/user/userSlice';
import { FormEditAddress, InputForm, InputReadOnly, showNotification } from '../../../../component';
import Avatar from './Avatar';
import { path } from '../../../../utils/const';

const UserProfile: React.FC = () => {
    const currentUser = useAppSelector((state) => state.user);
    const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false);
    const [payload, setPayload] = useState<IUserProfile>({} as IUserProfile);
    const dispatch = useAppDispatch();
    const { mobile_ui } = useAppSelector((state) => state.action);
    useEffect(() => {
        setPayload(currentUser);
    }, [currentUser]);

    const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>, name_id: string): void => {
        setPayload((prevState) => ({ ...prevState, [name_id]: e.target.value }));
    };
    const handleSummit = async () => {
        const res = await apiUpdateUser(payload);
        if (!res.success) {
            showNotification('Cập nhật không thành công');
            return;
        }
        dispatch(setDetailUser(res.data));
        showNotification('Cập nhật thành công', true);
    };
    return (
        <div className="tablet:fixed tablet:top-0 tablet:right-0 tablet:z-[1000] w-full h-full bg-white overflow-hidden p-4 laptop:rounded-lg ">
            <Link to={`${path.PAGE_USER}`} className='text-secondary laptop:hidden '>
                <ChevronLeftIcon fontSize="large" />
            </Link>
            <div className="w-full mb-4">
                <h1 className="text-xl ">Hồ Sơ Của Tôi</h1>
                <span className="text-sm text-secondary ">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
            </div>
            <div className="flex tablet:flex-col tablet:gap-4 w-full py-10 border-solid border-t-[1px] border-slate-200">
                {mobile_ui && <Avatar setPayload={setPayload} payload={payload} />}
                <div className="flex flex-col justify-center items-center tablet:w-full w-1/2 gap-6">
                    <InputForm
                        label="Họ"
                        name_id="lastName"
                        value={payload?.lastName}
                        handleOnchange={(e: any) => handleOnChangeValue(e, 'lastName')}
                    />
                    <InputForm
                        label="Tên"
                        name_id="firstName"
                        value={payload?.firstName}
                        handleOnchange={(e: any) => handleOnChangeValue(e, 'firstName')}
                    />
                    <InputReadOnly label="Email" value={payload.email} />
                    <InputForm
                        label="Số Điện Thoại"
                        name_id="mobile"
                        value={payload.mobile}
                        handleOnchange={(e: any) => handleOnChangeValue(e, 'mobile')}
                    />
                    <InputReadOnly
                        label="Địa chỉ"
                        isEdit
                        value={payload.address}
                        handleEdit={() => setIsOpenEditAddress(true)}
                    />
                    <ButtonOutline className="mx-auto px-6 text-white bg-primary" onClick={handleSummit}>
                        Cập nhật
                    </ButtonOutline>
                </div>
                {!mobile_ui && (
                    <div className="flex flex-col  w-1/2 items-center gap-4 ">
                        <Avatar setPayload={setPayload} payload={payload} />
                    </div>
                )}
            </div>
            {isOpenEditAddress && (
                <FormEditAddress payload={payload} setPayload={setPayload} setIsOpen={setIsOpenEditAddress} />
            )}
        </div>
    );
};

export default UserProfile;
