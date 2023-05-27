import React from 'react';
import {dogcute} from '../../../assets';

const Right: React.FC = () => {
    return (
        <div className=" w-2/6  h-full flex  flex-col items-center justify-center">
            <img className="w-full" src={dogcute} />
        </div>
    );
};

export default Right;
