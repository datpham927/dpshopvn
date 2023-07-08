import React from 'react';
import { Overlay } from '..';
import { useAppSelector } from '../../redux/hooks';
import { imgLoading } from '../../assets';
const Loading: React.FC = () => {
    const { isLoading } = useAppSelector((state) => state.action);
    return (
        <>
            {isLoading && (
                <Overlay className="z-[1000]">
                    <img className="w-[100px] h-[100px]" src={imgLoading} />
                </Overlay>
            )}
        </>
    );
};

export default Loading;
