import React from "react";
import { datachat } from "../types/typechat";

type Props = {
    item: datachat;
};
const RowChat = (props: Props) => {
    return (
        <div className="w-screen w-1/1 ">
            <div className="w-screen">
                {/* <div className="bg-[#343541]  flex justify-center">
                    {props.item.userchat ? (
                        <div className="w-1/2 mt-[26px] text-[#D1D5DB] mb-[20px]">
                            {props.item.userchat}
                        </div>
                    ) : (
                        <div>
                        </div>
                    )}
                </div> */}

                <div className=' flex justify-end '>
                    <div className="max-w-[40vw] px-[30px]">
                        <div className="rounded-l-[30px] rounded-r-[10px] py-3 px-6" style={{ backgroundColor: "#0084ff" }}>
                            {props.item.userchat && (
                                <p className="text-lg text-[white]">
                                    {props.item.userchat}
                                </p>
                            )}

                        </div>
                    </div>
                </div>
                <div className='pl-[30px] py-[30px]'>
                    <div className="flex">
                        <div className="rounded py-2 px-3 max-w-[50vw]" style={{ backgroundColor: "#E2F7CB" }}>
                        
                        {props.item.botchat && (
                                <p className="text-lg text-[black]">
                                    {props.item.botchat}
                                </p>
                            )}
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RowChat;