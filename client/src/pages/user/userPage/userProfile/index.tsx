import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import ButtonOutline from '../../../../component/buttonOutline';
import { apiUploadImage } from '../../../../services/apiUploadPicture';
import { loading2, noUser } from '../../../../assets';
import { UserProfile as IUserProfile } from '../../../../interfaces/interfaces';
import { apiUpdateUser } from '../../../../services/apiUser';
import { setDetailUser } from '../../../../redux/features/user/userSlice';
import { FormEditAddress, InputForm, InputReadOnly, showNotification } from '../../../../component';

const UserProfile: React.FC = () => {
    const currentUser = useAppSelector((state) => state.user);
    const [isOpenEditAddress, setIsOpenEditAddress] = useState<boolean>(false);
    const [payload, setPayload] = useState<IUserProfile>({
        address: '',
        lastName: '',
        firstName: '',
        mobile: '',
        avatar_url: '',
        email: '',
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
        setPayload(currentUser);
    }, [currentUser]);

    const [isLoadingImg, setIsLoadingImg] = useState<boolean>(false);
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setIsLoadingImg(true);
        if (!files) return;
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
        try {
            const response = await apiUploadImage(formData);
            setPayload((e) => ({ ...e, avatar_url: response.url }));
        } catch (error) {
            showNotification('Lỗi xảy ra khi tải lên ảnh:', false);
        }
        setIsLoadingImg(false);
    };

    const handleOnChangeValue = (e: React.ChangeEvent<HTMLInputElement>, name_id: string): void => {
        if (e.target.value) {
            setPayload((prevState) => ({ ...prevState, [name_id]: e.target.value }));
        }
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
        <div className="w-full h-full bg-white overflow-hidden p-4 rounded-lg">
            <div className="w-full mb-4">
                <h1 className="text-xl ">Hồ Sơ Của Tôi</h1>
                <span className="text-sm text-secondary ">Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
            </div>
            <div className="flex w-full   py-10 border-solid border-t-[1px] border-slate-200">
                <div className="flex flex-col justify-center items-center w-1/2 gap-6">
                    <InputForm
                        label="Họ"
                        name_id="lastName"
                        value={payload.lastName}
                        handleOnchange={(e: any) => handleOnChangeValue(e, 'lastName')}
                    />
                    <InputForm
                        label="Tên"
                        name_id="firstName"
                        value={payload.firstName}
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
                <div className="flex flex-col w-1/2 items-center gap-4 ">
                    <div className="w-48 h-48 rounded-full overflow-hidden mx-auto  border-[1px] border-solid border-separate">
                        {isLoadingImg ? (
                            <img src={loading2} />
                        ) : (
                            <img className="w-full h-full object-cover block" src={payload.avatar_url || noUser} />
                        )}
                    </div>
                    <label className=" border-[1px] border-solid border-separate py-2 px-4">
                        Chọn ảnh
                        <input type="file" readOnly hidden onChange={handleImageUpload} className="none" />
                    </label>
                </div>
            </div>
            {isOpenEditAddress && (
                <FormEditAddress payload={payload} setPayload={setPayload} setIsOpen={setIsOpenEditAddress} />
            )}
        </div>
    );
};

export default UserProfile;
