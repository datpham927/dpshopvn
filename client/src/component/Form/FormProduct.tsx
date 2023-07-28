import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { apiCreateProduct, apiGetAllBrandByCategory, apiUpdateProduct } from '../../services/apiProduct';
import { IProductItem, ProductDetail } from '../../interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { InputEditor, InputForm, Overlay, SelectOptions, showNotification } from '..';
import ButtonOutline from '../buttonOutline';
import { apiUploadImage } from '../../services/apiUploadPicture';
import { setIsLoading } from '../../redux/features/action/actionSlice';
import validate from '../../utils/valueDate';
interface IFormProduct {
    setProducts: React.Dispatch<React.SetStateAction<ProductDetail[]>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    productEdit?: ProductDetail;
}

const FormProduct: React.FC<IFormProduct> = ({ setIsOpen, setProducts, productEdit }) => {
    const [inputFields, setInputFields] = useState<ProductDetail>({} as ProductDetail);
    const [brands, setBrands] = useState<string[]>([]);
    const [selectCategory, setSelectCategory] = useState<string>('');
    const [selectBrand, setSelectBrand] = useState<string>('');
    const { categories } = useAppSelector((state) => state.category);
    const [imagesUrl, setImagesUrl] = useState<Array<string>>([]);
    const [invalidFields, setInvalidFields] = useState<
        Array<{
            name: string;
            message: string;
        }>
    >([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (productEdit) {
            setInputFields((prev) => ({ ...prev, ...productEdit }));
            setImagesUrl(productEdit.images);
            setSelectCategory(productEdit.category_code);
            setSelectBrand(productEdit.brand || '');
        }
    }, [productEdit]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiGetAllBrandByCategory();
            res.success && setBrands(res.data);
        };
        fetchApi();
    }, []);
    const handleInputField = (e: { target: { value: any } }, type: string) => {
        setInputFields((prev) => ({ ...prev, [type]: e.target.value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        dispatch(setIsLoading(true));
        if (!files) return;
        const formData = new FormData();
        for (const i of files) {
            formData.append('file', i);
            formData.append('upload_preset', import.meta.env.VITE_REACT_UPLOAD_PRESET);
            try {
                const response = await apiUploadImage(formData);
                setImagesUrl((image) => (image?.length > 0 ? [...image, response.url] : [response.url]));
            } catch (error) {
                showNotification('Lỗi xảy ra khi tải lên ảnh:', false);
            }
        }
        dispatch(setIsLoading(false));
    };
    const handleSummit = async (e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        const { description, discount, old_price, in_stock, title } = inputFields;
        const data: any = {
            title,
            description,
            discount,
            old_price,
            in_stock,
            images: imagesUrl,
            image_url: imagesUrl[0],
            brand: selectBrand,
            brand_slug: slugify(selectBrand),
            category_code: selectCategory,
            category_name: categories.find((c) => c.category_code === selectCategory)?.category || '',
        };
        if (!validate(data, setInvalidFields)) {
            showNotification('Vui lòng! nhập đầy đủ thông tin');
            return;
        }
        const res = productEdit
            ? await apiUpdateProduct({ ...data, _id: inputFields._id })
            : await apiCreateProduct(data);
        if (res.success) {
            setProducts((prev) => [res.data, ...prev]);
            showNotification('Thành công!', true);
        } else {
            showNotification('Thất bại!');
        }
        setIsOpen && setIsOpen(false);
    };
    return (
        <Overlay
            className="z-[1000]"
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen && setIsOpen(false);
            }}
        >
            <div
                className="relative w-8/12 h-[90%] bg-white  p-6 rounded-md"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen && setIsOpen(true);
                }}
            >
                <div className="w-full h-full overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        <h2>Thêm sản phẩm</h2>
                        <InputForm
                            col={true}
                            handleOnchange={(e) => handleInputField(e, 'title')}
                            label="Tên sản phẩm"
                            name_id="title"
                            value={inputFields.title}
                            invalidFields={invalidFields}
                        />
                        <div className="flex gap-6">
                            <SelectOptions
                                col={true}
                                label="Danh mục"
                                options={categories.map((e) => ({ code: e.category_code, name: e.category }))}
                                selectId={selectCategory}
                                setOptionId={setSelectCategory}
                            />
                            <SelectOptions
                                col={true}
                                label="Nhãn hàng"
                                options={brands.map((e) => ({ code: e, name: e }))}
                                selectId={selectBrand}
                                setOptionId={setSelectBrand}
                            />
                        </div>
                        <div className="flex gap-6">
                            <InputForm
                                type="number"
                                col={true}
                                handleOnchange={(e) => handleInputField(e, 'old_price')}
                                label="Đơn giá"
                                name_id="old_price"
                                value={inputFields.old_price}
                                invalidFields={invalidFields}
                            />
                            <InputForm
                                type="number"
                                col={true}
                                handleOnchange={(e) => handleInputField(e, 'in_stock')}
                                label="Số lượng"
                                name_id="in_stock"
                                value={inputFields.in_stock}
                                invalidFields={invalidFields}
                            />
                            <InputForm
                                type="number"
                                col={true}
                                handleOnchange={(e) => handleInputField(e, 'discount')}
                                label="Giảm giá"
                                name_id="discount"
                                value={inputFields.discount}
                                invalidFields={invalidFields}
                            />
                        </div>
                        {/* thêm hình ảnh */}
                        <div className="flex w-full items-center text-secondary text-sm  ">
                            <input id="comment_input" type="file" multiple hidden onChange={handleImageUpload} />
                            <label htmlFor="comment_input" className="flex w-full gap-2">
                                Thêm hình ảnh
                                <InsertPhotoIcon fontSize="medium" style={{ color: 'green' }} />
                            </label>
                        </div>
                        {imagesUrl?.length > 0 && (
                            <div className="w-full h-[100px]  ">
                                <ul className="grid grid-cols-6 gap-3 px-4 ">
                                    {imagesUrl?.map((image) => (
                                        <li className="relative w-full h-[60px] border-solid border-[1px] my-4 border-bgSecondary ">
                                            <img className="w-full h-full object-contain" src={image} />
                                            <span
                                                className="absolute top-0 right-1 cursor-pointer"
                                                onClick={() =>
                                                    setImagesUrl((images) => images.filter((i) => i !== image))
                                                }
                                            >
                                                <CloseIcon style={{ fontSize: '25px', color: '#C8C8CB' }} />
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* mô tả sản phẩm */}
                        <div>
                            <InputEditor
                                label="Mô Tả Sản Phẩm"
                                value={inputFields.description || ''}
                                setValue={setInputFields}
                            />
                        </div>
                        <ButtonOutline onClick={handleSummit} className="w-1/3 mx-auto bg-primary text-white">
                            {productEdit ? 'Cập nhật' : 'Thêm'}
                        </ButtonOutline>
                    </div>
                    <span
                        className="absolute top-2 right-2 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen && setIsOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="small" style={{ color: '#808089' }} />
                    </span>
                </div>
            </div>
        </Overlay>
    );
};

export default FormProduct;
