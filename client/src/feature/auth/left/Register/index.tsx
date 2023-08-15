import React ,{useState}from 'react';
import Confirm from './Confirm';
import Success from './Success';
import SendMail from './sendMail';


const Register: React.FC= () => {
    const [modeRegister,setModeRegister]=useState<number>(0)
    return (
        <>
         {modeRegister ===1&&   <Confirm setModeRegister={setModeRegister}  />}
        {modeRegister ===0&& <SendMail setModeRegister={setModeRegister} />}
        {modeRegister ===2&& <Success setModeRegister={setModeRegister}  />}
        </>
    );
};

export default Register;
