import React from 'react';

const NotFound:React.FC<{children:React.ReactNode}>= ({children}) => {
    return (
        <div className="flex justify-center items-center w-full h-[200px] bg-bgSecondary text-2xl font-semibold text-text_secondary">
           {children}
        </div>
    );
};

export default NotFound;
