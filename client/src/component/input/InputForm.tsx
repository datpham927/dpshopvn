import React from 'react';

interface InputFormProps {
    name_id: string;
    label?: string;
    value: string | number;
    col?: boolean;
    type?: string;
    placeholder?: string;
    invalidFields?: Array<{ name: string; message: string }>;
    handleOnchange?: (e: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({
    name_id,
    label,
    value,
    col,
    handleOnchange,
    type = 'text',
    placeholder,
    invalidFields,
}) => {
    return (
        <div className={`flex ${col ? 'flex-col' : ''} w-full h-auto gap-3 items-center`}>
        {   label&& <label
                htmlFor={name_id}
                className={`flex ${!col ? 'justify-end  w-1/2' : 'justify-start w-full'} text-sm text-secondary `}
            >
                {label}
            </label>}
            <div className="w-full">
                <input
                    id={name_id}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleOnchange}
                    className="flex  w-full border-solid border-[1px] border-slate-300 py-1 px-2 rounded-sm outline-none"
                    type={type}
                />
            </div>
           
            {invalidFields?.some((i) => i.name === name_id) && (
                <div className="flex w-full justify-start text-xs text-red_custom">Không được để trống</div>
            )}
        </div>
    );
};

export default InputForm;
