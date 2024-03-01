'use client';

import { QGen, Operator, Props } from "@/lib/question-gen";
import React, {useEffect, useState} from 'react';

export default function QBoard() {
    const defaultParams = {operation: Operator.Add, digit_count: 3};
    const [params, setParams] = useState<Props>(defaultParams);

    const [question, setQuestion] = useState<string|number>();
    useEffect(() => {
        const [x, y] = QGen({props: params});
        setQuestion(x);
    }, [params]);
    
    return (
        <p className="font-mono">{question}</p>
    )
}