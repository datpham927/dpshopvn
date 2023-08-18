import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatMoney } from '../../../../utils/formatMoney';
import {   ProductDetail } from '../../../../interfaces/interfaces';
import NotExit from '../../../../component/common/NotExit';
import { apiDeleteProduct } from '../../../../services/apiProduct';
import { FormProduct, showNotification } from '../../../../component';

interface ITableProducts {
    products: ProductDetail[];
    setProducts: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
}
const TableProducts: React.FC<ITableProducts> = ({ products, setProducts }) => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [productEdit, setProductEdit] = useState<ProductDetail>();

    const handleDeleteProduct = async (pid: string) => {
        if (confirm('Bạn có muốn xóa sản phẩm không?')) {
            const res = await apiDeleteProduct(pid);
            if (res.success) {
                setProducts((prev) => prev.filter((p) => p?._id !== pid));
                showNotification('Xóa thành công!', true);
            } else {
                showNotification('Xóa không thành công!');
            }
        }
    };
    return (
        <>
            <div className="flex flex-col mb-6">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center" sx={{ width: '100px' }}>
                                    Số lượng
                                </TableCell>
                                <TableCell align="center" sx={{ width: '100px' }}>
                                    Đơn giá
                                </TableCell>
                                <TableCell align="center" sx={{ width: '100px' }}>
                                    Giảm giá
                                </TableCell>
                                <TableCell align="center" sx={{ width: '100px' }}>
                                    Danh mục
                                </TableCell>
                                <TableCell align="center">Nhãn hàng</TableCell>
                                <TableCell align="center">Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((p) => (
                                <TableRow key={p?._id.slice(-10)}>
                                    <TableCell align="center" sx={{ textTransform: 'uppercase', color: 'green' }}>
                                        {p?._id.slice(-8)}
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
                                        {p?.title}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p?.in_stock}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {formatMoney(p?.old_price)}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p?.discount}%
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p?.category_name}
                                    </TableCell>
                                    <TableCell align="center" sx={{ color: 'rgb(128,128,137)' }}>
                                        {p?.brand}
                                    </TableCell>
                                    <TableCell align="center" sx={{ width: '100px' }}>
                                        <p
                                            className="text-primary underline text-xs cursor-pointer"
                                            onClick={() => {
                                                setProductEdit(p);
                                                setOpenForm(true);
                                            }}
                                        >
                                            Chỉnh sửa
                                        </p>
                                        <p
                                            className="text-primary underline text-xs cursor-pointer"
                                            onClick={() => handleDeleteProduct(p?._id)}
                                        >
                                            Xóa
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {products?.length == 0 && <NotExit label="Không có sản phẩm nào" />}
            </div>
            {openForm && <FormProduct setIsOpen={setOpenForm} setProducts={setProducts} productEdit={productEdit} />}
        </>
    );
};

export default TableProducts;
