import React, { memo } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PaginationItem from './PaginationItem';
interface PaginationProps {
    totalPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage, setCurrentPage }) => {
    const pageDisplay = () => {
        const newArray = [];
        for (let i = 1; i <= totalPage - 1; i++) {
            newArray.push(i);
        }
        const pageDisplay = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        return newArray.filter((p) => pageDisplay.includes(p));
    };

    return (
        <div className="flex w-4/12 mx-auto gap-4 justify-center">
            {/* ------------ left ------------- */}
            <PaginationItem
                HandleOnClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)}
                currentPage={currentPage}
            >
                <KeyboardArrowLeftIcon  style={{ opacity: `${currentPage === 0 ? '0.4' : '1'}` }} />
            </PaginationItem>
            {/* ------------------------ */}
            <PaginationItem HandleOnClick={() => setCurrentPage(0)} currentPage={currentPage}>
                {Number(0)}
            </PaginationItem>
            {/* --------------------------- */}
            {currentPage >= 3 && (
                <div className="flex items-center">
                    <MoreHorizIcon fontSize="small" style={{ opacity: '0.3' }} />
                </div>
            )}
            {pageDisplay().map((p) => (
                <PaginationItem HandleOnClick={() => setCurrentPage(p)} currentPage={currentPage}>
                    {p}
                </PaginationItem>
            ))}
            {currentPage < totalPage - 2 && (
                <div className="flex items-center">
                    <MoreHorizIcon fontSize="small" style={{ opacity: '0.3' }} />
                </div>
            )}

            {/* ------------ right ------------- */}
            <PaginationItem HandleOnClick={() => setCurrentPage(totalPage)} currentPage={currentPage}>
                {Number(totalPage)}
            </PaginationItem>

            <PaginationItem
                HandleOnClick={() => currentPage !== totalPage && setCurrentPage(currentPage + 1)}
                currentPage={currentPage}
            >
                <ChevronRightIcon style={{ opacity: `${currentPage === totalPage ? '0.4' : '1'}` }} />
            </PaginationItem>
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Pagination);
