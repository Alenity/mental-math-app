import { Operator, ParamProps, TimeMode } from "./custom-types";

export function QGen({params} : {params: ParamProps}): (string|number)[] {
    let x: number;
    let y: number;
    x = (Math.floor(Math.random()*Math.pow(10, params?.digit_count)));
    y = (Math.floor(Math.random()*Math.pow(10, params?.digit_count)));
    

    function noZero(): number {
        y = (Math.ceil(Math.random()*Math.pow(10, params?.digit_count)));
        return y;
    }

    function factor(x: number): number {
        if (x === 0) {
            return noZero();
        }
        let factorCount = 0;
        let factors = [];
        for (let i = 1; i <= Math.sqrt(x); i++) {
            if (x % i === 0) {
               factorCount += 2;
               factors.push(i);
               factors.push((x/i));
            }
        }
        let z = factors[Math.floor(Math.random()*factorCount)]
        return z;
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
                    y = factor(x);
                    return [(x + " / " + y), (x / y)];
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
            y = factor(x);
            return [(x + " / " + y), (x / y)];
        case Operator.Multiply:
            return [(x + " x " + y), (x * y)];
        default: 
            return [(x + " + " + y), (x + y)];
    }
}
