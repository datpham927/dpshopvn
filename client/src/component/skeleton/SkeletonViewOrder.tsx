import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonViewOrder = () => {
    return (
        <div className="w-full ">
            <div className="flex flex-col gap-3 w-full">
                <Skeleton variant="rectangular" width={'300px'} height={'30px'} />
                <Skeleton variant="rectangular" width={'200px'} height={'20px'} />
                <Skeleton variant="rectangular" width={'200px'} height={'20px'} />
            </div>
            <div className="w-full  grid grid-cols-3 my-6 gap-4">
                <div className="flex flex-col gap-2 w-full ">
                    <Skeleton variant="rectangular" width={'200px'} height={'20px'} />
                    <div className="rounded-md min-h-[100px]">
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full ">
                    <Skeleton variant="rectangular" width={'200px'} height={'20px'} />
                    <div className="rounded-md  min-h-[100px]">
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full ">
                    <Skeleton variant="rectangular" width={'200px'} height={'20px'} />
                    <div className="rounded-md  min-h-[100px]">
                        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full ">
                <Skeleton variant="rectangular" width={'100%'} height={'200px'} />
            </div>
        </div>
    );
};

export default SkeletonViewOrder;
