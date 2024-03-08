'use client';
import { jetbrains } from "@/app/fonts";
import { useState, useEffect } from "react";

export default function Streak({count} : {count: number}) {
    useEffect(() => {
        
    }, [count])
    
    return (
        <div className="p-3 flex flex-1 justify-around items-center">
            <p className={`${jetbrains.className} text-4xl text-text-color`}>streak:{count}</p>
        </div>
    );
}