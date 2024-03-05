'use client';
import { jetbrains } from "@/app/fonts";
import { ParamProps } from "@/lib/custom-types";
import { JSXElementConstructor, ReactNode } from "react";

export default function NumInput({children, label, callBack, childID}: {children: ReactNode, label: string, callBack: Function, childID: string}) {

    return (
        <div className="flex flex-row">
            <label className={`flex-1 text-center flex justify-between px-3 text-hover-color ${jetbrains.className}`}>
                <button className="px-2 bg-main-bg-color border-transparent rounded-md border" onClick={() => callBack(false, childID)}>-</button>
                {children}
                <button className="px-2 bg-main-bg-color border-transparent rounded-md border" onClick={() => callBack(true, childID)}>+</button>
                {label}
            </label>
        </div>
    )
}
