import { Skeleton } from '@mui/material';
import React from 'react';
import { SkeletonProducts } from '..';

const SkeLetonDetailPage: React.FC = () => {
    return (
        <>
            <div className='m-4'>
                <Skeleton variant="rectangular" width={'444px'} height={'30px'} />
            </div>
            <div className="flex">
                <div className="flex flex-col  rounded-l-md overflow-hidden p-4 gap-4 ">
                    <Skeleton variant="rectangular" width={'444px'} height={'444px'} />
                    <Skeleton variant="rectangular" width={'444px'} height={'70px'} />
                </div>
                <div className="flex flex-col flex-1 h-full p-4 gap-6">
                    <Skeleton variant="rectangular" width={'100px'} height={'30px'} />
                    <Skeleton variant="rectangular" width={'100%'} height={'60px'} />
                    <Skeleton variant="rectangular" width={'50%'} height={'30px'} />
                    <Skeleton variant="rectangular" width={'50%'} height={'40px'} />
                    <div className="flex gap-4 ">
                        <Skeleton variant="rectangular" width={'200px'} height={'40px'} />
                        <Skeleton variant="rectangular" width={'150px'} height={'40px'} />
                    </div>
                    <Skeleton variant="rectangular" width={'40px'} height={'20px'} />
                </div>
            </div>

            <div className="flex flex-col p-3 rounded-sm bg-white gap-7 mt-5">
                <div className="text-2xl  px-6">
                    <Skeleton variant="rectangular" width={'200px'} height={'40px'} />
                </div>
                <SkeletonProducts index={6} />
            </div>
        </>
    );
};

export default SkeLetonDetailPage;
