const validate = (valueForm: any, setInvalidFields: any) => {
    let error = true;
    const valueFormArray = Object.entries(valueForm);
    valueFormArray.forEach((e) => {
        if (e[1] === '' || e[1] === 0 ||e[1] === undefined) {
            setInvalidFields((prev: any) => [
                ...prev,
                {
                    name: e[0],
                    message: 'Bạn không được bỏ trống!',
                },
            ]);
            error = false;
        }
    });
   
    return error;
};

export default validate;
