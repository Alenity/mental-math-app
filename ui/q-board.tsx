'use client';
import QDisplay from "./q-display";
import { ParamProps } from "@/lib/custom-types";
import { SetStateAction, useEffect, useState } from "react";
import ControlPanel from "./control-panel";

export default function QBoard() {
    const [params, setParams] = useState<ParamProps>(null!);
    const [cpHidden, setCPHidden] = useState<boolean>(false);
    const exchange = (params: SetStateAction<ParamProps>) => {
        setParams(params);
    }

    const testStart = () => {
        setCPHidden(true);
    }

    const testEnd = () => {
        setCPHidden(false);
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-around">
            <ControlPanel exchange={exchange} />
            <QDisplay params={params}/>
        </div>
    );
}