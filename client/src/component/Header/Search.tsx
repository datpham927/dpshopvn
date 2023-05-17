import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import { addSearchHistory, getSearchHistories } from '../../services/apiSearch';
import { setOpenSearchResults } from '../../redux/features/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

interface search {
    text: string;
}
const Search: React.FC = () => {
    const [searchHistories, setSearchHistories] = useState<search[]>([]);
    const [limitHistory, setLimitHistory] = useState<number>(4);
    const { openSearchResults } = useAppSelector((state) => state.action);

    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getSearchHistories();
            if (res.success) {
                setSearchHistories(res.data);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        const sss = (e: { target: any }) => {
            if (e.target.id == 'overlay') {
                dispatch(setOpenSearchResults(false));
            }
        };
        document.addEventListener('click', sss);
    }, []);

    return (
        <>
            <div className="bg-white flex  rounded-[2px] w-search h-search">
                <div className="relative flex items-center w-full h-full ">
                    <input
                        onClick={() => {
                            dispatch(setOpenSearchResults(true));
                        }}
                        type="text"
                        className="outline-none border-none w-full px-2 text-[14px] text-black"
                        placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                    />
                    {openSearchResults && (
                        <div
                            id="search"
                            className="absolute w-full top-[100%] right-0 bg-white shadow-search py-[10px]"
                        >
                            <div className="flex flex-col gap-3 ">
                                <h1 className="text-sm font-medium  px-[20px]">Tìm kiếm gần đây </h1>
                                <ul className="flex flex-col ">
                                    {searchHistories.map((s, i) => {
                                        return (
                                            i < limitHistory && (
                                                <li className="flex gap-3 hover:bg-hover cursor-pointer py-2 px-5">
                                                    <SearchIcon style={{ color: 'rgb(128, 128, 137)' }} />{' '}
                                                    <span className="text-sm ">{s.text}</span>
                                                </li>
                                            )
                                        );
                                    })}
                                    <div
                                        className="mx-auto text-sm text-primary cursor-pointer py-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(setOpenSearchResults(true));
                                            if (limitHistory === 4) {
                                                setLimitHistory(10);
                                            } else {
                                                setLimitHistory(4);
                                            }
                                        }}
                                    >
                                        {limitHistory === 4 ? (
                                            <span>
                                                Xem thêm <KeyboardArrowDownIcon fontSize="small" />
                                            </span>
                                        ) : (
                                            <span>
                                                Thu gọn <KeyboardControlKeyIcon fontSize="small" />
                                            </span>
                                        )}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <button className="outline-none bg-[#0D5CB6] w-[150px] h-[40px] text-white rounded-r-[2px]">
                    <SearchIcon /> <span> Tìm kiếm </span>
                </button>
            </div>
        </>
    );
};

export default Search;
