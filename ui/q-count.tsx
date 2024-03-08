'use client';
import { jetbrains } from "@/app/fonts";
import {useState, useEffect} from "react";

export default function QCount({count, total, ping} : {count: number, total?:number, ping: any}) {
    useEffect(() => {
        if (count === total) {
            ping();
        }
    }, [count, total, ping])
    return (
        <div className="flex flex-1 p-3 justify-around items-center">
            <p className={`${jetbrains.className} text-text-color text-4xl`}>{count}{total ? "/" + total: ""}</p>
        </div>
    )
}