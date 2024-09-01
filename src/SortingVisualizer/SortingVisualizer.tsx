import * as React from 'react'
import './SortingVisualizer.css'
import {randomizeArr} from "../array_randomizer/ArrayRandomizer";
import {BubbleSort} from "../algorithms/sort_algorithms/BubbleSort";
import {compareNumbers} from "../comparitors/NumberComparitor";
import {VisArray} from "../visualisable_datastructures/VisArray";

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
    idx1: number | null;
    idx2: number | null;
    paused: boolean;
    private resolveWaiting: (() => void) | null = null;

    constructor(props: Readonly<SVProps> | SVProps) {
        super(props);
        this.sorting = false;
        this.size = 100;
        this.speed = 100;
        this.idx2 = null;
        this.idx1 = null;
        this.paused = false;
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

    async bs() {
        if (this.sorting) return;
        this.sorting = true;
        await BubbleSort.sort(this.state.array, compareNumbers, this);
    }

    async vbs() {
        if (this.sorting) return;
        this.sorting = true;
        let varr: VisArray = new VisArray(this.state.array, this);
        await BubbleSort.visSort(varr, compareNumbers);
    }

    generateNewArr() {
        this.sorting = false;
        this.setIDX(null, null);
        this.randomizeArr(this.size);
    }

    cancel() {
        this.sorting = false;
        this.paused = false;
        this.setIDX(null, null);
    }

    pause() {
        if(!this.sorting) {
            this.paused = false;
            return;
        }
        
        this.paused = !this.paused;
        if (!this.paused && this.resolveWaiting) {
            this.resolveWaiting();
            this.resolveWaiting = null;
        }
    }

    async waitForPaused(): Promise<void> {
        if (!this.paused) {
          return;
        }
    
        return new Promise<void>((resolve) => {
          this.resolveWaiting = resolve;
        });
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
            <button onClick = {() => this.vbs()}>Visualize</button>
            <button onClick={() => this.generateNewArr()}>Generate New Array</button>
            <button onClick= {() => this.cancel()}>CANCEL</button>
            <button onClick= {() => this.pause()}>Pause/Resume</button>
        </div>
    }
}

//REPLACE SILENT RETURNS
// class SortRunningError extends Error {

// }