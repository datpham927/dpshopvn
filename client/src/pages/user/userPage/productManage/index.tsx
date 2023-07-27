import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getAllProductUser } from '../../../../services/apiProduct';
import { IProductItem } from '../../../../interfaces/interfaces';
import { formatMoney } from '../../../../utils/formatMoney';
import { InputForm, Pagination } from '../../../../component';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppDispatch } from '../../../../redux/hooks';
import { setIsLoading } from '../../../../redux/features/action/actionSlice';
import useDebounce from '../../../../Hook/useDebounce';
import NotOrder from '../../../../component/common/NotOrder';

interface IQueries {
    createdAt: string;
    title: string;
}

const ProductManage: React.FC = () => {
    const [products, setProducts] = useState<IProductItem[]>([]);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [queries, setQueries] = useState<IQueries>({} as IQueries);
    const dispatch = useAppDispatch();
    const valueDebounce = useDebounce(queries.title, 500);

    useEffect(() => {
        const fetchApi = async () => {
            dispatch(setIsLoading(true));
            const query: { title?: string; createdAt?: string } = {}; // Use the appropriate types for the 'query' object
            if (valueDebounce) {
                query.title = valueDebounce.toString();
            }
            if (queries.createdAt) {
                query.createdAt = queries.createdAt;
            }
            const res = await getAllProductUser({ limit: 10, page: currentPage, ...query });
            dispatch(setIsLoading(false));
            if (!res.success) return;
            setProducts(res.products);
            setTotalPage(res.totalPage);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, valueDebounce, queries.createdAt]);
    useEffect(() => {
        document.querySelector('header')?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [currentPage]);
    return (
        <div className="w-full h-full bg-white px-4 pb-6">
            <h1 className="text-1xl text-primary m-5 ">Quản lý sản phẩm</h1>
            <div className="w-[100px] h-[100px] flex my-4 justify-center items-center border-solid border-[1px] ml-5 border-primary">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

            <div className="grid grid-cols-2 w-full my-6 justify-between items-center ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Ngày đăng sản phẩm"
                            defaultValue={queries.createdAt}
                            onChange={(e: any) =>
                                setQueries((prev) => ({ ...prev, createdAt: e.format('MM/DD/YYYY') }))
                            }
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <InputForm
                    label="Tìm kiếm"
                    name_id="search"
                    value={queries.title}
                    handleOnchange={(e) => setQueries((prev) => ({ ...prev, title: e.target.value }))}
                />
            </div>

            <div className="flex flex-col gap-6">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="center">Đơn giá</TableCell>
                                <TableCell align="center">Giảm giá</TableCell>
                                <TableCell align="center" sx={{ width: '100px' }}>
                                    Danh mục
                                </TableCell>
                                <TableCell align="center">Nhãn hàng</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((p) => (
                                <TableRow key={p._id.slice(-10)}>
                                    <TableCell align="center" sx={{ textTransform: 'uppercase', color: 'green' }}>
                                        {p._id.slice(-8)}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '200px',
                                            color: 'rgb(128,128,137)',
                                        }}
                                    >
                                        {p.title}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p.in_stock}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {formatMoney(p.old_price)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p.discount}%
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p.brand}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p.category_name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: '100px' }}>
                                        <p className="text-secondary">Chỉnh sửa</p>
                                        <p>Xóa</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {products.length == 0 && <NotOrder label="Không có sản phẩm nào" />}
                {totalPage > 0 && (
                    <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPage={totalPage} />
                )}
            </div>
        </div>
    );
};

export default ProductManage;

// import React, { useEffect, useState } from 'react';
// import parse from 'html-react-parser';
// import { ButtonOutline, InputEditor, InputForm, SelectOptions } from '../../../../component';
// import { ProductDetail } from '../../../../interfaces/interfaces';
// import { useAppSelector } from '../../../../redux/hooks';
// import { apiGetAllBrandByCategory } from '../../../../services/apiProduct';
// import slugify from 'slugify';
// const ProductManage: React.FC = () => {
//     const [inputFields, setInputFields] = useState<ProductDetail>({} as ProductDetail);
//     const [brands, setBrands] = useState<string[]>([]);
//     const [selectCategory, setSelectCategory] = useState<string>('');
//     const [description, setDescription] = useState<string>('');
//     const [selectBrand, setSelectBrand] = useState<string>('');
//     const { categories } = useAppSelector((state) => state.category);

//     useEffect(() => {
//         const fetchApi = async () => {
//             const res = await apiGetAllBrandByCategory();
//             res.success && setBrands(res.data);
//         };
//         fetchApi();
//     }, []);
//     const handleInputField = (e: { target: { value: any } }, type: string) => {
//         setInputFields((prev) => ({ ...prev, [type]: e.target.value }));
//     };

//     const handleSummit = () => {
//         console.log({
//             description,
//             ...inputFields,
//             brand: selectBrand,
//             brand_slug: slugify(selectBrand),
//             category_code: selectCategory,
//             category: categories.find((c) => c.category_code === selectCategory)?.category_code,
//         });
//     };
//     return (
//         <div>
//             <div className="flex flex-col gap-6">
//                 <h2>Thêm sản phẩm</h2>
//                 <div>
//                     <InputForm
//                         col={true}
//                         handleOnchange={(e) => handleInputField(e, 'title')}
//                         label="Tên sản phẩm"
//                         name_id="title"
//                         value={inputFields.title}
//                     />
//                 </div>

//                 <div className="flex gap-6">
//                     <SelectOptions
//                         col={true}
//                         label="Danh mục"
//                         options={categories.map((e) => ({ code: e.category_code, name: e.category }))}
//                         selectId={selectCategory}
//                         setOptionId={setSelectCategory}
//                     />
//                     <SelectOptions
//                         col={true}
//                         label="Nhãn hàng"
//                         options={brands.map((e) => ({ code: e, name: e }))}
//                         selectId={selectBrand}
//                         setOptionId={setSelectBrand}
//                     />
//                 </div>
//                 <div className="flex gap-6">
//                     <InputForm
//                         type="number"
//                         col={true}
//                         handleOnchange={(e) => handleInputField(e, 'old_price')}
//                         label="Đơn giá"
//                         name_id="old_price"
//                         value={inputFields.old_price}
//                     />
//                     <InputForm
//                         type="number"
//                         col={true}
//                         handleOnchange={(e) => handleInputField(e, 'in_stock')}
//                         label="Số lượng"
//                         name_id="in_stock"
//                         value={inputFields.in_stock}
//                     />
//                     <InputForm
//                         type="number"
//                         col={true}
//                         handleOnchange={(e) => handleInputField(e, 'discount')}
//                         label="Giảm giá"
//                         name_id="discount"
//                         value={inputFields.discount}
//                     />
//                 </div>
//                 <div>
//                     <InputEditor
//                         label="Mô Tả Sản Phẩm"
//                         value={inputFields.description || ''}
//                         setValue={setDescription}
//                     />
//                     <div>{parse(description)}</div>
//                 </div>
//                 <ButtonOutline onClick={handleSummit}>luu</ButtonOutline>
//             </div>
//         </div>
//     );
// };

// export default ProductManage;
