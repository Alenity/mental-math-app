'use client';
import React, { useState, useEffect, useCallback } from "react";
import Streak from "./streak";
import QCount from "./q-count";
import { DataProps, ParamProps } from "@/lib/custom-types";

export default function Stats({params, data, ping} : {params: ParamProps, data: DataProps, ping: any}) {
    
    const timeElement = React.useCallback(() => {
        if(params?.time_mode === "timed") {
            return <Timer time={params.time_mode_val} ping={ping}/>
        } else if (params?.time_mode === "race") {
            return <Stopwatch/>
        } else {
            return null;
        }
    }, [params, ping]);
    

    return (
        <div className={`flex w-full justify-between flex-1`}>
            {timeElement()}
            <Streak streak={data?.streak}/>
            {params?.time_mode === "race" ? <QCount count={data?.questionsCorrect} ping={ping} total={params?.time_mode_val}/> : null}
        </div>
    )
}

export function Timer({time, ping} : {time : number, ping : any}) {
    const [h, setH] = useState(Math.round(time/3600));
    const [m, setM] = useState(Math.floor((time%3600) / 60));
    const [s, setS] = useState(time%60);
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (h === 0 && m === 0 && s === 0) {
                ping();
                clearInterval(interval);
            } else if (m === 0 && s === 0) {
                setH(h-1);
                setM(59);
                setS(59);
            } else if (s === 0) {
                setM(m-1);
                setS(59);
            } else {
                setS(s-1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [h, m, s, ping]);

    return (
        <div className="p-3 flex flex-1 justify-around items-center">
            <p className={` text-text-color text-4xl`}>{h.toString().length === 1 ? "0" + h : h}:{m.toString().length === 1 ? "0" + m: m}:{s.toString().length === 1 ? "0" + s: s}</p>
        </div>
    );
}

export function Stopwatch() {
    const [h, setH] = useState(0);
    const [m, setM] = useState(0); 
    const [s, setS] = useState(0);
    const [cs, setCs] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (cs % 99 === 0 && cs !== 0) {
                setS(s + 1);
                setCs(0)
            } else if (s % 59 === 0 && s !== 0) {
                setM(m + 1);
                setS(0);
            } else if (m % 59 === 0 && m !== 0) {
                setH(h + 1);
                setM(0);
            } else {
                setCs(cs + 1);
            }
        }, 10);

        return () => {
            clearInterval(interval);
        }
    }, [h, m, s, cs])

    return (
        <div className="p-3 flex flex-1 justify-around items-center">
            <p className={` text-text-color text-4xl`}>{h.toString().length === 1 ? "0" + h : h}:{m.toString().length === 1 ? "0" + m: m}:{s.toString().length === 1 ? "0" + s: s}:{cs.toString().length === 1 ? "0" + cs: cs}</p>
        </div>
    )
}