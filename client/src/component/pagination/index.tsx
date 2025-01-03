import React, { memo, useMemo } from 'react';
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
  const pageDisplay = useMemo(() => {
    if (totalPage <= 1) return [];
    const visiblePages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    return Array.from({ length: totalPage - 1 }, (_, i) => i + 1).filter((p) => visiblePages.includes(p));
  }, [currentPage, totalPage]);

  const handleSetPage = (page: number) => {
    if (page >= 0 && page <= totalPage && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex w-4/12 mx-auto gap-4 justify-center">
      {/* Left navigation */}
      <PaginationItem HandleOnClick={() => handleSetPage(currentPage - 1)} currentPage={currentPage} disabled={currentPage === 0}>
        <KeyboardArrowLeftIcon />
      </PaginationItem>

      {/* First page */}
      <PaginationItem HandleOnClick={() => handleSetPage(0)} currentPage={currentPage}>
        {0}
      </PaginationItem>

      {/* Ellipsis before */}
      {currentPage >= 3 && (
        <div className="flex items-center">
          <MoreHorizIcon fontSize="small" style={{ opacity: '0.3' }} />
        </div>
      )}

      {/* Visible pages */}
      {pageDisplay.map((p) => (
        <PaginationItem key={p} HandleOnClick={() => handleSetPage(p)} currentPage={currentPage}>
          {p}
        </PaginationItem>
      ))}

      {/* Ellipsis after */}
      {currentPage < totalPage - 3 && (
        <div className="flex items-center">
          <MoreHorizIcon fontSize="small" style={{ opacity: '0.3' }} />
        </div>
      )}

      {/* Last page */}
      <PaginationItem HandleOnClick={() => handleSetPage(totalPage)} currentPage={currentPage}>
        {totalPage}
      </PaginationItem>

      {/* Right navigation */}
      <PaginationItem HandleOnClick={() => handleSetPage(currentPage + 1)} currentPage={currentPage} disabled={currentPage === totalPage}>
        <ChevronRightIcon />
      </PaginationItem>
    </div>
  );
};

export default memo(Pagination);
