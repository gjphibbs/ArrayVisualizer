import * as React from 'react'
import './SortingVisualizer.css'
import {randomizeArr} from "../array_randomizer/ArrayRandomizer";
import {BubbleSort} from "../algorithms/sort_algorithms/BubbleSort";
import {compareNumbers} from "../comparitors/NumberComparitor";

export interface SVProps {
    // fn: (arr: any[]) => any[];
}

export interface SVState {
    array: any[];
}

export class SortingVisualizer extends React.Component<SVProps, SVState> {
    sorting: boolean;
    size: number;
    speed: number; //ms delay in animations
    idx1: number | null
    idx2: number | null

    constructor(props: Readonly<SVProps> | SVProps) {
        super(props);
        this.sorting = false;
        this.size = 100;
        this.speed = 1;
        this.idx2 = null;
        this.idx1 = null;
        this.state = {
            array: []
        };
    }

    setIDX(one: number | null, two: number | null) {
        this.idx1 = one;
        this.idx2 = two;
    }

    setSpeed(s: number) {
        this.speed = s;
    }

    componentDidMount() {
        this.randomizeArr(this.size);
    }

    randomizeArr(len: number) {
        const array = new Array(len);
        randomizeArr(array, 5, 1000);
        this.setState({array});
    }

    async sortThis() {
        if (this.sorting) return;
        this.sorting = true;
        await BubbleSort.sort(this.state.array, compareNumbers, this);
    }

    generateNewArr() {
        this.sorting = false;
        this.setIDX(null, null);
        this.randomizeArr(this.size);
    }

    cancel() {
        this.sorting = false;
        this.setIDX(null, null);
    }

    render() {
        const {array}: any = this.state;
        return <div className="array-container">
            {array.map((value: number, idx: any) => {
                if (this.idx1 === idx || this.idx2 === idx) {
                    return (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{height: `${value}px`, backgroundColor: `red`}}>
                        </div>
                    );
                } else {
                    return (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{height: `${value}px`, backgroundColor: `blue`}}>
                        </div>
                    );
                }
            })}
            <button onClick = {() => this.sortThis()}>Sort</button>
            <button onClick={() => this.generateNewArr()}>Generate New Array</button>
            <button onClick= {() => this.cancel()}>CANCEL</button>
        </div>
    }
}