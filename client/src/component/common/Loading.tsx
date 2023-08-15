import React from 'react';
import { Overlay } from '..';
import ReactLoading from 'react-loading';
import { useAppSelector } from '../../redux/hooks';
const Loading: React.FC = () => {
    const { isLoading } = useAppSelector((state) => state.action);
    return (
        <>
            {isLoading && (
                <Overlay className="z-[1000]">
                 <ReactLoading type="cylon" color="rgb(0,247,0)" />
                </Overlay>
            )}
        </>
    );
};

export default Loading;
