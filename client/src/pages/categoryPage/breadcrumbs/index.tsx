import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface BreadcrumbProps {
    title: string;
}
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ title }) => {
    const breadcrumbs = [
        {
            path: '/',
            breadcrumb: 'Trang chủ',
        },
        {
            path: '#',
            breadcrumb: title,
        },
    ];

    const navigate = useNavigate();

    return (
        <div className="flex w-full items-center py-2  ">
            {breadcrumbs.map((b) => (
                <>
                    <div
                        onClick={() => b.path !== '#' && navigate(b.path)}
                        className={`flex w-auto text-sm  ${
                            b.path !== '#' ? 'text-secondary cursor-pointer hover:underline' : 'text-primary'
                        }`}
                    >
                        <span
                            className={`${
                                b.path !== '#' ? 'flex whitespace-nowrap' : 'truncate-trailing line-clamp-1'
                            }`}
                        >
                            {b.breadcrumb}
                        </span>
                    </div>
                    {b.path !== '#' && (
                        <span className="text-secondary w-auto ">
                            <KeyboardArrowRightIcon fontSize="medium" />
                        </span>
                    )}
                </>
            ))}
        </div>
    );
};

export default Breadcrumbs;
