import React from 'react';
import { Header, Login, Overlay } from '../component';

interface DefaultLayoutProps {
    children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div className="flex flex-col  mx-auto">
            <Header />
            <div className="flex flex-col mx-auto max-w-7xl">{children}</div>
            <Overlay />
            <Login />
        </div>
    );
};

export default DefaultLayout;
