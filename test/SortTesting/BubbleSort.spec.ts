import {BubbleSort as BS} from "../../src/algorithms/sort_algorithms/BubbleSort";
    let TA: number[] = new Array(10);
    for (let i = 0; i < 10; i++) {
        TA[i] = Math.random() * 1000
    }
    console.log(TA);
    let comparison = (thing1: number, thing2: number): boolean => {
        return thing1 > thing2;
    }

    console.time("sort");
    BS.sort(TA, comparison);
    console.timeEnd("sort");
    console.log(TA);
