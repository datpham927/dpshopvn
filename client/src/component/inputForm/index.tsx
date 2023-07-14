import React from 'react';

interface InputFormProps {
    name_id: string;
    label: string;
    value: string;
    handleOnchange?: (e: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ name_id, label, value, handleOnchange }) => {
    return (
        <div className="flex w-full h-auto gap-3 items-center">
            <label htmlFor={name_id} className="flex justify-end text-sm text-secondary w-1/2">
                {label}
            </label>
            <div className="w-full">
                <input
                    id={name_id}
                    value={value}
                    onChange={handleOnchange}
                    className="flex  w-full border-solid border-[1px] border-slate-300 py-1 px-2 rounded-sm outline-none"
                    type="text"
                />
            </div>
        </div>
    );
};

export default InputForm;
