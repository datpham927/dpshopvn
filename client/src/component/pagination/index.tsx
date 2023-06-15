import React from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
    totalPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalPage, currentPage, setCurrentPage }) => {
    const pageDisplay = () => {
        const newArray = [];
        for (let i = 0; i <= totalPage; i++) {
            newArray.push(i);
        }
        const pageDisplay = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        return newArray.filter((p) => pageDisplay.includes(p));
    };

    return (
        <div className="flex w-4/12 mx-auto gap-3 justify-center">
            <button
                className={`w-9 h-9 rounded-full text-base font-medium ${currentPage === 0 ? 'opacity-30' : ''}`}
                onClick={() => currentPage !== 0 && setCurrentPage(0)}
            >
                <KeyboardArrowLeftIcon />
            </button>
            {pageDisplay().map((p) => (
                <button
                    onClick={() => setCurrentPage(p)}
                    className={`w-9 h-9 rounded-full text-base font-medium ${
                        p === currentPage ? 'bg-primary text-white' : ''
                    }`}
                >
                    {p}
                </button>
            ))}
            {currentPage !== totalPage && (
                <button
                    className="w-9 h-9 rounded-full text-base font-medium"
                    onClick={() => currentPage !== totalPage && setCurrentPage(totalPage)}
                >
                    <ChevronRightIcon />
                </button>
            )}
        </div>
    );
};

export default Pagination;
