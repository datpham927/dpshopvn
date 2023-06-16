import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import slugify from 'slugify';

interface BreadcrumbProps {
    category_name: string;
    category_code: string;
    title: string;
}
const Breadcrumbs: React.FC<BreadcrumbProps> = ({ category_name, category_code, title }) => {
    const breadcrumbs = [
        {
            path: '/',
            breadcrumb: 'Trang chủ',
        },
        {
            path: `/danh-muc/${slugify(category_name)}/${category_code}}`,
            breadcrumb: category_name,
        },
        {
            path: '#',
            breadcrumb: title,
        },
    ];

    return (
        <div className="flex w-full items-center py-2  ">
            {breadcrumbs.map((b) => (
                <>
                    <Link
                        to={b.path}
                        className={`flex w-auto text-sm  ${
                            b.path !== '#' ? 'text-secondary hover:underline' : 'text-primary'
                        }`}
                    >
                        <span className={`${b.path !== '#' ? 'flex whitespace-nowrap' : 'truncate-trailing line-clamp-1'}`}>
                            {b.breadcrumb}
                        </span>
                    </Link>
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
