import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import {
    addSearchHistory,
    deleteSearchHistory,
    getSearchHistories,
    getSuggestResult,
} from '../../../services/apiSearch';
import useDebounce from '../../../Hook/useDebounce';
import { getAllProduct } from '../../../services/apiProduct';
import { Link, useNavigate } from 'react-router-dom';
import { Overlay } from '../..';
import { useEffect, useRef, useState } from 'react';
import ListCategories from './ListCategories';

interface search {
    text: string;
    _id: string;
}
interface resultSuggest {
    title: string;
    _id: string;
    slug: string;
}
interface ProductSuggest extends resultSuggest {
    images: string[];
    slug: string;
}
const Search: React.FC = () => {
    const [searchHistories, setSearchHistories] = useState<search[]>([]);
    const [resultSuggest, setResultSuggest] = useState<resultSuggest[]>([]);
    const [productSuggest, setProductSuggest] = useState<ProductSuggest[]>([]);
    const [limitHistory, setLimitHistory] = useState<number>(4);
    const [openSearchResults, setOpenSearchResults] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const valueDebounce = useDebounce(searchValue, 200);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await getSearchHistories();
            if (res?.success) {
                setSearchHistories(res?.data);
            }
        };
        openSearchResults && fetchHistory();
    }, [openSearchResults]);

    const handleInput = async (e: { target: HTMLInputElement }) => {
        const title = (e.target as HTMLInputElement).value;
        if (title === '') setOpenSearchResults(true);
        setSearchValue(title);
    };
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getSuggestResult(valueDebounce);
            res?.data?.length == 0 && setOpenSearchResults(false);
            setResultSuggest(res?.data);
        };
        valueDebounce.trim() == '' ? setResultSuggest([]) : fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueDebounce]);

    useEffect(() => {
        const fetchApiProductSuggest = async () => {
            const res = await getAllProduct({ limit: 8, sort: '-solid' });
            setProductSuggest(res?.products);
        };
        openSearchResults && fetchApiProductSuggest();
    }, [openSearchResults]);

    const handleDeleteHistory = async (_id: string) => {
        setSearchHistories(() => searchHistories.filter((h) => h._id !== _id));
        await deleteSearchHistory(_id);
    };
    const handleSummit = async () => {
        if (searchValue) {
            navigate(`/tim-kiem/${searchValue}`);
            await addSearchHistory(searchValue);
        }
        setOpenSearchResults(false);
        setSearchValue('');
    };
    useEffect(() => {
        const handleKeyPress = (event: { key: string }) => {
            if (event.key === 'Enter') {
                handleSummit();
            }
        };
        document.body.addEventListener('keydown', handleKeyPress);
        return () => document.body.removeEventListener('keydown', handleKeyPress);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const suggestResult =
        resultSuggest?.length > 0 &&
        resultSuggest?.map((s, i) => {
            return (
                i < limitHistory && (
                    <Link
                        to={`/${s.slug}/${s._id}`}
                        onClick={() => {
                            setOpenSearchResults(false);
                            setSearchValue('');
                        }}
                        key={uuidv4()}
                        className="flex gap-3 hover:bg-hover cursor-pointer py-2 px-5"
                    >
                        <SearchIcon style={{ color: 'rgb(128, 128, 137)' }} />{' '}
                        <span className="text-sm ">{s?.title}</span>
                    </Link>
                )
            );
        });

    const searchRecent = (
        <>
            <div>
                {searchHistories?.length > 0 && (
                    <div className="flex flex-col gap-3 ">
                        <h1 className="text-sm font-medium px-[20px]">Tìm kiếm gần đây </h1>
                        <ul className="flex flex-col ">
                            {searchHistories?.map((s, i) => {
                                return (
                                    i < limitHistory && (
                                        <Link
                                            to={`/tim-kiem/${s.text}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenSearchResults(false);
                                            }}
                                            key={uuidv4()}
                                            className="flex gap-3 justify-between hover:bg-hover cursor-pointer py-2 px-5"
                                        >
                                            <div>
                                                <SearchIcon style={{ color: 'rgb(128, 128, 137)' }} />{' '}
                                                <span className="text-sm ">{s?.text}</span>
                                            </div>
                                            <div
                                                className="text-secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteHistory(s?._id);
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </div>
                                        </Link>
                                    )
                                );
                            })}
                            {searchHistories?.length > 4 && (
                                <div
                                    className="mx-auto text-sm text-primary cursor-pointer py-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenSearchResults(true);
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
                )}
                <div className="flex flex-col gap-3 ">
                    <h1 className="font-medium text-base px-[20px]">Sản phẩm nổi bật</h1>
                    <ul className="grid grid-cols-4 gap-1">
                        {productSuggest?.map((s) => {
                            return (
                                <Link
                                    to={`${s.slug}/${s._id}`}
                                    key={uuidv4()}
                                    onClick={() => setOpenSearchResults(false)}
                                    className="flex flex-col w-full hover:shadow-search items-center py-1 px-3 cursor-pointer gap-2 "
                                >
                                    <img className="w-1/2 rounded-md" src={s?.images[0]} />
                                    <span className="w-full text-xs  truncate ">{s?.title}</span>
                                </Link>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );

    return (
        <div className="flex justify-between  tablet:w-full w-8/12">
            <div className="flex flex-col gap-2 w-full">
                <div className="bg-white flex  rounded-[2px] w-full h-search z-50">
                    <div id="search" className="relative flex items-center w-full h-full tablet:p-0 pr-4 ">
                        <button className="laptop:hidden outline-none h-full px-2" onClick={handleSummit}>
                            <img
                                className="w-6 h-6"
                                src="https://salt.tikicdn.com/ts/upload/34/62/0c/6ae13efaff83c66f810c4c63942cf6c0.png"
                            />
                        </button>
                        <input
                            onFocus={() => {
                                setOpenSearchResults(true);
                            }}
                            ref={inputRef}
                            onChange={handleInput}
                            value={searchValue}
                            type="text"
                            className="outline-none border-none w-full px-3 text-[14px] text-black"
                            placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                        />
                        {searchValue !== '' && (
                            <span onClick={() => setSearchValue('')} className="flex items-center">
                                <CloseIcon fontSize="small" style={{ color: 'rgb(128, 128, 137)' }} />
                            </span>
                        )}
                        {openSearchResults && (
                            <div className="absolute w-full top-[100%] right-0 bg-white shadow-search py-4">
                                {resultSuggest?.length > 0 ? suggestResult : searchRecent}
                            </div>
                        )}
                    </div>
                    <button
                        className="tablet:hidden outline-none bg-[rgb(9,115,69)] w-[150px] h-[40px] text-white rounded-r-[2px]"
                        onClick={handleSummit}
                    >
                        <SearchIcon /> <span> Tìm kiếm </span>
                    </button>
                </div>
                <ListCategories />
                {openSearchResults && <Overlay onClick={() => setOpenSearchResults(false)} className="z-20" />}
            </div>
        </div>
    );
};

export default Search;
