import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SEARCH_UTILITY } from '../../../../utils/const';

interface PropsInterface {
    setOptionTab: React.Dispatch<React.SetStateAction<number>>;
    optionTab: number;
}

const Header: React.FC<PropsInterface> = ({ setOptionTab, optionTab }) => {
    return (
        <div className="flex flex-col gap-1 w-full h-full mt-[-15px]  sticky top-0 right-0 bg-background_primary pt-4 pb-1  z-100">
            <div className="px-4 py-2 rounded-sm text-xl font-normal bg-white">Gợi ý hôm nay</div>
            <div className="grid grid-cols-8 gap-4 ">
                {SEARCH_UTILITY.map((e) => (
                    <div
                        key={uuidv4()}
                        onClick={() => setOptionTab(e.id)}
                        className={`flex flex-col gap-1 p-1 ${
                            optionTab == e.id ? 'bg-bgSecondary border-primary' : 'bg-white'
                        }  rounded-[4px] justify-center items-center cursor-pointer border-[1px] border-transparent border-solid  hover:border-primary`}
                    >
                        <img className="w-[50px]" src={e.image} />
                        <span className="text-sm text-primary">{e.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;
