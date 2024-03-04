import { Operator, ParamProps, TimeMode } from "./custom-types";

export function QGen({params} : {params: ParamProps}): (string|number)[] {
    let x: number;
    let y: number;
    x = (Math.floor(Math.random()*Math.pow(10, params?.digit_count)));
    y = (Math.floor(Math.random()*Math.pow(10, params?.digit_count)));
    

    function noZero(y: number, count: number): number {
        y = (Math.floor(Math.random()*Math.pow(10, params?.digit_count)));
        if (y === 0) {
            y = 1;
            return y;
        } else return y;
    }

    switch (params?.operation) {
        case Operator.All:
            let num = Math.floor(Math.random() * (4)) + 1;
            switch (num) {
                case 1:
                    return [(x + " + " + y), (x + y)];
                case 2:
                    return [(x + " - " + y), (x - y)];
                case 3:
                    y = noZero(y, 0);
                    return [(x + " / " + y), parseFloat((x / y).toPrecision(2))];
                case 4:
                    return [(x + " x " + y), (x * y)];
                default:
                    return [(x + " + " + y), (x + y)];
            }
        case Operator.Add:
            return [(x + " + " + y), (x + y)];
        case Operator.Subtract: 
            return [(x + " - " + y), (x - y)];
        case Operator.Divide:
            return [(x + " / " + y), (x / y)];
        case Operator.Multiply:
            return [(x + " x " + y), (x * y)];
        default: 
            return [(x + " + " + y), (x + y)];
    }
}
