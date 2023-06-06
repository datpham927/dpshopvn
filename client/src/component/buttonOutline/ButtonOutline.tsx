import React from 'react';

interface ButtonOutlineProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?:string,
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({ children, onClick, className }) => {
    return (
        <button
            className={`flex justify-center gap-1 text-sm font-medium items-center p-2 rounded-[4px]  border-[1px] border-solid border-primary text-primary  hover:bg-opacity-60 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonOutline;
