import React, { memo, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Overlay, showNotification } from '..';
import { getApiPublicDistrict, getApiPublicProvince, getApiPublicWards } from '../../services/apiAddress';
import SelectAddress from '../selectAddress';
import { UserProfile } from '../../interfaces/interfaces';
import InputReadOnly from '../inputReadOnly';
import ButtonOutline from '../buttonOutline';
import { apiUpdateUser } from '../../services/apiUser';
import { useAppDispatch } from '../../redux/hooks';
import { setDetailUser } from '../../redux/features/user/userSlice';

interface FormEditAddressProps {
    payload: UserProfile;
    setPayload?: (e: any) => void;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
const FormEditAddress: React.FC<FormEditAddressProps> = ({ payload, setPayload, setIsOpen, isEdit }) => {
    const [provinces, setProvinces] = useState<{ code: number; name: string }[]>();
    const [districts, setDistricts] = useState<{ code: number; name: string }[]>();
    const [provinceId, setProvinceId] = useState<number>();
    const [districtId, setDistrictId] = useState<number>();
    const [wardsId, setWardsId] = useState<number>();
    const [wards, setWards] = useState<{ code: number; name: string }[]>();
    const [address, setAddress] = useState<string>('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        setAddress(payload.address);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payload]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getApiPublicProvince();
            setProvinces(response);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        setDistrictId(undefined);
        const fetchApi = async () => {
            const response = await getApiPublicDistrict(provinceId);
            setDistricts(response.districts);
        };
        fetchApi();
    }, [provinceId]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getApiPublicWards(districtId);
            setWards(response.wards);
        };
        fetchApi();
    }, [districtId]);

    useEffect(() => {
        if (provinceId || districtId || wardsId) {
            setAddress(
                `${wardsId ? wards?.find((e) => e?.code === Number(wardsId))?.name + ', ' : ''}${
                    districtId ? districts?.find((e) => e?.code === Number(districtId))?.name + ', ' : ''
                }${provinceId ? provinces?.find((e) => e?.code === Number(provinceId))?.name : ''}`,
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinceId, districtId, wardsId]);

    const handleSummit = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        if (isEdit) {
            const res = await apiUpdateUser({ ...payload, address });
            if (res.success) {
                dispatch(setDetailUser(res.data));
                showNotification('Cập nhật thành công', true);
            } else {
                showNotification('Cập nhật không thành công', false);
            }
        } else {
            setPayload && setPayload((prev: any) => ({ ...prev, address }));
        }
        setIsOpen && setIsOpen(false);
    };

    return (
        <Overlay
            className="index-[1000] "
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen && setIsOpen(false);
            }}
        >
            <div
                className="relative  flex flex-col w-[600px] h-[400px] p-6 bg-white rounded-lg overflow-hidden"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen && setIsOpen(true);
                }}
            >
                <h1 className="text-xl mx-auto mb-8">Chỉnh sửa địa chỉ</h1>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <SelectAddress
                            label="Tỉnh/Thành phố"
                            type="province"
                            options={provinces}
                            selectId={provinces?.find((e) => e.code === provinceId)?.code}
                            setOptionId={setProvinceId}
                        />
                        <SelectAddress
                            label="Quận/Huyện"
                            type="district"
                            options={districts}
                            selectId={districts?.find((e) => e.code === districtId)?.code}
                            setOptionId={setDistrictId}
                        />
                        <SelectAddress
                            label="Xã/Phường"
                            type="wards"
                            options={wards}
                            selectId={wards?.find((e) => e.code === wardsId)?.code}
                            setOptionId={setWardsId}
                        />
                    </div>
                    <InputReadOnly label="Địa chỉ" value={address} />
                </div>
                <ButtonOutline className="mx-auto px-6 text-white bg-primary mt-6" onClick={handleSummit}>
                    Lưu
                </ButtonOutline>
                {/* ---------- close --------- */}
                <span
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen && setIsOpen(false);
                    }}
                >
                    <CloseIcon fontSize="small" style={{ color: '#808089' }} />
                </span>
            </div>
        </Overlay>
    );
};

export default memo(FormEditAddress);
