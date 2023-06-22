import React, { memo } from 'react';
interface PropsInterface {
    currentPage: number;
    children: React.ReactNode;
    HandleOnClick: () => void;
}
const PaginationItem: React.FC<PropsInterface> = ({ currentPage, children, HandleOnClick }) => {
    return (
        <button
            onClick={HandleOnClick}
            className={`w-9 h-9  shrink-0 rounded-full text-base font-medium text-secondary ${
                children === currentPage ? 'bg-primary text-white' : ''
            }`}
        >
            {children}
        </button>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(PaginationItem);
