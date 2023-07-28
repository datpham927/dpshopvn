import React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { InputForm } from '../../../../component';

interface IFilterProduct {
    queries: {
        createdAt: string;
        title: string;
    };
    setQueries: React.Dispatch<
        React.SetStateAction<{
            createdAt: string;
            title: string;
        }>
    >;
}
const FilterProduct: React.FC<IFilterProduct> = ({ queries, setQueries }) => {
    console.log(queries);
    return (
        <div className="grid grid-cols-2 w-full my-6 justify-between items-center ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Ngày đăng sản phẩm"
                        value={queries.createdAt}
                        onChange={(e: any) => setQueries((prev) => ({ ...prev, createdAt: e.format('MM/DD/YYYY') }))}
                    />
                    <div
                        onClick={(e: any) => setQueries((prev) => ({ ...prev, createdAt: '' }))}
                        className="text-primary font-medium cursor-pointer flex items-center"
                    >
                        Mặc định
                    </div>
                </DemoContainer>
            </LocalizationProvider>
            <InputForm
                label="Tìm kiếm"
                name_id="search"
                placeholder='Tên sản phẩm'
                value={queries.title}
                handleOnchange={(e) => setQueries((prev) => ({ ...prev, title: e.target.value }))}
            />
        </div>
    );
};

export default FilterProduct;
