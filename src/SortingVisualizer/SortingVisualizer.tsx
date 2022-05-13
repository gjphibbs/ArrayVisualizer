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
    cancel: boolean;
    sorting: boolean;
    speed: number; //ms delay in animations

    constructor(props: Readonly<SVProps> | SVProps) {
        super(props);
        this.cancel = false;
        this.sorting = false;
        this.speed = 100;
        this.state = {
            array: []
        };
    }

    setSpeed(s: number) {
        this.speed = s;
    }

    componentDidMount() {
        this.randomizeArr(100);
    }

    randomizeArr(len: number) {
        const array = new Array(len);
        randomizeArr(array);
        this.setState({array});
    }

    async sortThis() {
        if (this.sorting === true) return;
        this.cancel = false;
        this.sorting = true;
        await BubbleSort.sort(this.state.array, compareNumbers, this);
    }

    generateNewArr() {
        this.cancel = true;
        this.sorting = false;
        this.randomizeArr(100);
    }

    render() {
        const {array}: any = this.state;
        return <div className="array-container">
            {array.map((value: number, idx: any) => {
                return (
                <div
                    className="array-bar"
                    key={idx}
                    style={{height: `${value}px`}}>
                </div>
                );
            })}
            <button onClick = {() => this.sortThis()}>Sort</button>
            <button onClick={() => this.generateNewArr()}>Generate New Array</button>
        </div>
    }
}