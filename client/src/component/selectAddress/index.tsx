import React, { memo } from 'react';
interface SelectAddressProps {
    selectId: number | undefined;
    setOptionId: (e: number) => void;
    options: any;
    label: string;
    type: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const SelectAddress: React.FC<SelectAddressProps> = ({ selectId, setOptionId, options, label }): JSX.Element => {
    return (
        <div className="flex w-full gap-3 items-center">
            <label className="flex text-sm text-secondary justify-end w-2/6">{label}</label>
            <select
                value={selectId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setOptionId(Number(e.target.value));
                }}
                className="flex w-4/6 border-solid border-[1px] text-center border-slate-300 py-1 px-2 rounded-sm outline-none"
            >
                <option key="" value="">{`---${label}---`}</option>
                {options?.map((e: { code?: string; name?: string }) => (
                    <option key={e.code} value={e.code}>
                        {e.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(SelectAddress);











// import React, { memo, useEffect, useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import { InputForm, Overlay } from '..';
// import { getApiPublicDistrict, getApiPublicProvince, getApiPublicWards } from '../../services/apiAddress';
// import SelectAddress from '../selectAddress';
// import { UserProfile } from '../../interfaces/interfaces';
// import InputReadOnly from '../inputReadOnly';
// import ButtonOutline from '../buttonOutline';

// interface FormEditAddressProps {
//     payload: UserProfile;
//     setPayload: (e: any) => void;
//     setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
// }

// // eslint-disable-next-line react-refresh/only-export-components
// const FormEditAddress: React.FC<FormEditAddressProps> = ({ payload, setPayload, setIsOpen }) => {
//     const [provinces, setProvinces] = useState<{ code: number; name: string }[]>();
//     const [districts, setDistricts] = useState<{ code: number; name: string }[]>();
//     const [provinceId, setProvinceId] = useState<number>();
//     const [districtId, setDistrictId] = useState<number>();
//     const [wardsId, setWardsId] = useState<number>();
//     const [wards, setWards] = useState<{ code: number; name: string }[]>();
//     const [address, setAddress] = useState<string>('');

//     useEffect(() => {
//         setAddress(payload.address);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [payload]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const response = await getApiPublicProvince();
//             setProvinces(response);
//         };
//         fetchApi();
//     }, []);

//     useEffect(() => {
//         setDistrictId(undefined);
//         const fetchApi = async () => {
//             const response = await getApiPublicDistrict(provinceId);
//             setDistricts(response.districts);
//         };
//         fetchApi();
//     }, [provinceId]);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const response = await getApiPublicWards(districtId);
//             setWards(response.wards);
//         };
//         fetchApi();
//     }, [districtId]);

//     useEffect(() => {
//         setAddress(
//             `${wardsId ? wards?.find((e) => e?.code === Number(wardsId))?.name + ',' : ''}${
//                 districtId ? districts?.find((e) => e?.code === Number(districtId))?.name + ',' : ''
//             } ${provinceId ? provinces?.find((e) => e?.code === Number(provinceId))?.name : ''}`,
//         );
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [provinceId, districtId]);

//     const handleSummit = (e: { stopPropagation: () => void }) => {
//         e.stopPropagation();
//         setIsOpen && setIsOpen(false);
//         setPayload((prev: any) => ({ ...prev, address }));
//     };
//     return (
//         <Overlay
//             className="index-[1000] "
//             onClick={(e: { stopPropagation: () => void; }) => {
//                 e.stopPropagation();
//                 setIsOpen && setIsOpen(false);
//             }}
//         >
//             <div
//                 className="relative  flex flex-col w-[600px] h-[400px] p-6 bg-white rounded-lg overflow-hidden"
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     setIsOpen && setIsOpen(true);
//                 }}
//             >
//                 <h1 className="text-xl mx-auto mb-8">Chỉnh sửa địa chỉ</h1>
//                 <div className="flex flex-col gap-6">
//                     <div className="flex flex-col gap-3">
//                         <SelectAddress
//                             label="Tỉnh/Thành phố"
//                             type="province"
//                             options={provinces}
//                             selectId={provinces?.find((e) => e.code === provinceId)?.code}
//                             setOptionId={setProvinceId}
//                         />
//                         <SelectAddress
//                             label="Quận/Huyện"
//                             type="district"
//                             options={districts}
//                             selectId={districts?.find((e) => e.code === districtId)?.code}
//                             setOptionId={setDistrictId}
//                         />
//                         <SelectAddress
//                             label="Xã/Phường"
//                             type="wards"
//                             options={wards}
//                             selectId={wards?.find((e) => e.code === wardsId)?.code}
//                             setOptionId={setWardsId}
//                         />
//                     </div>
//                     <InputReadOnly label="Địa chỉ" value={address} />
//                 </div>
//                 <ButtonOutline className="mx-auto px-6 text-white bg-primary mt-6" onClick={handleSummit}>
//                     Lưu
//                 </ButtonOutline>
//                 {/* ---------- close --------- */}
//                 <span
//                     className="absolute top-2 right-2 cursor-pointer"
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         setIsOpen && setIsOpen(false);
//                     }}
//                 >
//                     <CloseIcon fontSize="small" style={{ color: '#808089' }} />
//                 </span>
//             </div>
//         </Overlay>
//     );
// };

// export default memo(FormEditAddress);
