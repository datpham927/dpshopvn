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
    const [searchValue, setSearchValue] = useState<string>('');
    const [resultSuggest, setResultSuggest] = useState<string>('');
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
        const handleOnclick = (e: { target: any }) => {
            console.log();
            if (e.target.closest('#search')) {
                dispatch(setOpenSearchResults(true));
            } else {
                dispatch(setOpenSearchResults(false));
            }
        };
        document.addEventListener('click', handleOnclick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (e: { target: { value: React.SetStateAction<string> } }) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            <div className="bg-white flex  rounded-[2px] w-search h-search">
                <div id="search" className="relative flex items-center w-full h-full ">
                    <input
                        onFocus={() => {
                            dispatch(setOpenSearchResults(true));
                        }}
                        onChange={handleInput}
                        type="text"
                        className="outline-none border-none w-full px-3 text-[14px] text-black"
                        placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                    />
                    {openSearchResults && (
                        <div className="absolute w-full top-[100%] right-0 bg-white shadow-search py-[10px]">
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
