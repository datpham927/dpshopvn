import React, { memo } from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface InputReadOnlyProps {
    label: string;
    value: any;
    isEdit?: boolean;
    handleEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}
// eslint-disable-next-line react-refresh/only-export-components
const InputReadOnly: React.FC<InputReadOnlyProps> = ({ label, value, isEdit, handleEdit }) => {
    return (
        <div className="flex w-full gap-3 items-center">
            <label htmlFor="exact-address" className="flex justify-end w-1/2  text-secondary">
                {label}
            </label>
            <div className="flex w-full bg-[#e9ecef] rounded-md overflow-hidden">
                <input
                    id="exact-address"
                    type="text"
                    readOnly
                    value={value}
                    className="bg-[#e9ecef] w-full px-3 py-1 outline-none"
                />
                {isEdit && (
                    <div
                        className="text-sm text-blue-custom my-2 cursor-pointer"
                        onClick={() => {
                            if (handleEdit) {
                                handleEdit((isEdit) => !isEdit);
                            }
                        }}
                    >
                        <EditIcon fontSize="small" style={{ opacity: '0.4' }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(InputReadOnly);
