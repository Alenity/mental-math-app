'use client';
import QDisplay from "./q-display";
import { ParamProps } from "@/lib/custom-types";
import { SetStateAction, useState, useCallback } from "react";
import ControlPanel from "./control-panel";

export default function QBoard() {
    const [params, setParams] = useState<ParamProps>(null!);
    const [onGoing, setOnGoing] = useState<boolean>(false);    

    const exchange = useCallback((params: SetStateAction<ParamProps>) => {
        setParams(params);
    }, []);

    const shortCuts = useCallback((event: any) => {
        switch (event.key) {
            case "Escape":
                onGoing ? setOnGoing(false) : null;
                break;
            case "Enter": 
                
                break;
            default: 
                break;
        }
    }, [onGoing]);

    const testStart = useCallback(() => {
        setOnGoing(true);
        document.getElementById("mainInput")?.focus();
    }, []);

    const testEnd = useCallback(() => {
        setOnGoing(false);
    }, []);

    return (
        <div autoFocus={true} onKeyDown={shortCuts} className="w-full h-full flex flex-col items-center justify-around">
            <ControlPanel exchange={exchange} hidden={onGoing}/>
            <QDisplay params={params} onGoing={onGoing} functions={[testStart, testEnd, shortCuts]}/>
        </div>
    );
}