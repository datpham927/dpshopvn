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
    return (
        <div className="mobile:flex mobile:flex-col mobile:gap-2 grid grid-cols-2 w-full my-6 justify-between items-center ">
            <div className='flex w-full h-full gap-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DatePicker']} >
                    <DatePicker
                        label="Ngày đăng sản phẩm"
                        value={queries.createdAt}
                        onChange={(e: any) => setQueries((prev) => ({ ...prev, createdAt: e.format('MM/DD/YYYY') }))}
                    />
                   
                </DemoContainer>
            </LocalizationProvider>
            <div
                        onClick={(e: any) => setQueries((prev) => ({ ...prev, createdAt: '' }))}
                        className="flex text-primary font-medium cursor-pointer items-center"
                    >
                        Mặc định
                    </div>
            </div>
            <InputForm
                
                name_id="search"
                placeholder="Tên sản phẩm"
                value={queries.title}
                handleOnchange={(e) => setQueries((prev) => ({ ...prev, title: e.target.value }))}
            />
        </div>
    );
};

export default FilterProduct;
