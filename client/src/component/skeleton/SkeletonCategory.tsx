import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonCategory: React.FC<{ index: number }> = ({ index }) => {
    return (
        <>
            {[...Array(index)].map(() => (
                <div className="flex flex-col gap-2 w-full h-full  px-3  items-center cursor-pointer hover:translate-y-[-4px] duration-500">
                        <Skeleton variant="rectangular" width={'100%'} height={'70px'} />
                        <Skeleton variant="text" width={'100%'} height={'20px'} />
                </div>
            ))}
        </>
    );
};

export default SkeletonCategory;
