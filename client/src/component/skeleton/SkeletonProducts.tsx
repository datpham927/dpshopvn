import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonProducts: React.FC<{ index: number }> = ({ index }) => {
    return (
        <div className="grid mobile:grid-cols-2 tablet:grid-cols-4 grid-cols-6  z-0">
            {[...Array(index)].map(() => (
                <div className="flex flex-col w-full h-full  px-3 pb-6 ">
                    <div className="flex w-[90%] h-[170px] mx-auto">
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                    <Skeleton variant="text" width={'100%'} height={'50px'} />
                    <Skeleton variant="text" width={'100%'} height={'30px'} />
                    <Skeleton variant="text" width={'100%'} height={'30px'} />
                </div>
            ))}
        </div>
    );
};

export default SkeletonProducts;
