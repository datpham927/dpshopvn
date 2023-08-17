import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFeatureAuth, setOpenFeatureAuth } from '../../redux/features/action/actionSlice';
import Login from './left/Login';
import Right from './Right/Right';
import Register from './left/Register';
import { Overlay } from '../../component';
import Forgot from './left/forgot';

const Auth: React.FC = () => {
    const { openFeatureAuth, featureAuth } = useAppSelector((state) => state.action);
    const dispatch = useAppDispatch();

    const handleClose = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(setOpenFeatureAuth(false));
        dispatch(setFeatureAuth(0))
    };
    const handleOpen = (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        dispatch(setOpenFeatureAuth(true));
    };
    return (
        <>
            {openFeatureAuth && (
                <Overlay className="z-[1000]" onClick={handleClose}>
                    <div onClick={handleOpen} className="relative w-[800px] h-auto ">
                        <div className="flex w-full h-full bg-white m-auto rounded-lg items-center overflow-hidden">
                            {featureAuth == 0 ? <Register /> : featureAuth == 1 ? <Login /> : <Forgot />}
                            <Right />
                        </div>
                        {/* -------------- */}
                        <div
                            onClick={handleClose}
                            className="absolute right-[-13px] top-[-13px] shadow-search w-10 h-10 flex justify-center items-center rounded-full bg-primary text-white"
                        >
                            <CloseIcon fontSize="medium" />
                        </div>
                    </div>
                </Overlay>
            )}
        </>
    );
};

export default Auth;
