import AppLayout from "@components/Applayout";
import React from "react";

interface Props {
    children: React.ReactNode
}

const sidebar = (props: Props) => {
    
    return(
        <div className="">
           <AppLayout title="" >
            {props.children}
           </AppLayout>
        </div>
    )
}

export default sidebar