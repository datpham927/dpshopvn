import React from 'react';
import { useAppSelector } from '../../redux/hooks';

const Overlay: React.FC = () => {
    const { openSearchResults } = useAppSelector((state) => state.action);
    return <>{openSearchResults && <div className="fixed w-screen h-screen right-0 top-0 bg-overlay z-[900]"></div>}</>;
};

export default Overlay;
