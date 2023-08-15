import React, { useState } from 'react';
import { ProductDetail } from '../../../../interfaces/interfaces';
import { FormProduct } from '../../../../component';
interface ICreateProduct {
    setProducts: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
}
const CreateProduct: React.FC<ICreateProduct> = ({ setProducts }) => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    return (
        <>
            <div
                className="w-[100px] h-[100px] flex my-4 justify-center items-center border-solid border-[1px] ml-5 border-primary cursor-pointer"
                onClick={() => setOpenForm(true)}
            >
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
            {openForm && <FormProduct setIsOpen={setOpenForm} setProducts={setProducts}/>}
        </>
    );
};

export default CreateProduct;
