import React from 'react';
import { Auth, Header,  Overlay } from '../component';

interface DefaultLayoutProps {
    children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <div className="flex flex-col  mx-auto">
            <Header />
            <div className="flex flex-col mx-auto max-w-7xl">{children}</div>
            <Overlay />
            <Auth/>
        </div>
    );
};

export default DefaultLayout;
