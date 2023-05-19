import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { Header } from '../component';

interface DefaultLayoutProps {
    children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const { openSearchResults } = useAppSelector((state) => state.action);
    return (
        <div className="flex flex-col  mx-auto">
            <Header />
            <div className='flex flex-col mx-auto max-w-7xl'>
            {children}
            </div>
            {openSearchResults && (
                <div id="overlay" className="fixed w-screen h-screen right-0 top-0 bg-overlay z-[900]"></div>
            )}
        </div>
    );
};

export default DefaultLayout;