import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import { addSearchHistory, getSearchHistories, getSuggestResult } from '../../services/apiSearch';
import { setOpenSearchResults } from '../../redux/features/action/actionSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import useDebounce from '../../Hook/useDebounce';

interface search {
    text: string;
    _id: string;
}
interface resultSuggest {
    title: string;
    _id: string;
}
const Search: React.FC = () => {
    const [searchHistories, setSearchHistories] = useState<search[]>([]);
    const [limitHistory, setLimitHistory] = useState<number>(4);
    const { openSearchResults } = useAppSelector((state) => state.action);
    const [searchValue, setSearchValue] = useState<string>('');
    const [resultSuggest, setResultSuggest] = useState<resultSuggest[]>([]);
    const dispatch = useAppDispatch();
    const valueDebounce=useDebounce(searchValue,200)
    const inputRef =  useRef<HTMLInputElement>(null);
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
            if (e.target.closest('#search')) {
                dispatch(setOpenSearchResults(true));
            } else {
                dispatch(setOpenSearchResults(false));
                setLimitHistory(4)
            }
        };
        document.addEventListener('click', handleOnclick);
        return removeEventListener('click', handleOnclick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = async (e: { target: HTMLInputElement; }) => {
        const title=(e.target as HTMLInputElement).value
        if(title==="") dispatch(setOpenSearchResults(true));
        setSearchValue(title);
    };
  useEffect(()=>{
         const fetchApi=async()=>{
             const res=await getSuggestResult(valueDebounce)
             res.data.length==0&&dispatch(setOpenSearchResults(false));
             setResultSuggest(res.data)
         }
         valueDebounce.trim()==""? setResultSuggest([]): fetchApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[valueDebounce])

    const suggestResult =
        resultSuggest.length > 0 &&resultSuggest?.map((s, i) => {
                  return (
                      i < limitHistory && (
                          <li key={s._id} className="flex gap-3 hover:bg-hover cursor-pointer py-2 px-5">
                              <SearchIcon style={{ color: 'rgb(128, 128, 137)' }} />{' '}
                              <span className="text-sm ">{s?.title}</span>
                          </li>
                      )
                  );
              })

     const searchRecent= <div className="flex flex-col gap-3 ">
                            <h1 className="text-sm font-medium px-[20px]">Tìm kiếm gần đây </h1>
                            <ul className="flex flex-col ">
                                {searchHistories?.map((s, i) => {
                                    return (
                                        i < limitHistory && (
                                            <li
                                                key={s._id}
                                                className="flex gap-3 hover:bg-hover cursor-pointer py-2 px-5"
                                            >
                                                <SearchIcon style={{ color: 'rgb(128, 128, 137)' }} />{' '}
                                                <span className="text-sm ">{s.text}</span>
                                            </li>
                                        )
                                    );
                                })}
                                {searchHistories.length > 4 && (
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
                                )}
                            </ul>
                        </div>


    return (
        <>
            <div className="bg-white flex  rounded-[2px] w-search h-search">
                <div id="search" className="relative flex items-center w-full h-full ">
                    <input
                        onFocus={() => {
                            dispatch(setOpenSearchResults(true));
                        }}
                        ref={inputRef}
                        onChange={handleInput}
                        value={searchValue}
                        type="text"
                        className="outline-none border-none w-full px-3 text-[14px] text-black"
                        placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                    />
                    {openSearchResults && (
                        <div className="absolute w-full top-[100%] right-0 bg-white shadow-search py-[10px]">
                            {resultSuggest.length > 0 ? (
                                suggestResult
                            ) : (
                                searchRecent
                            )}
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
