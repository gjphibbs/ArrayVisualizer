import * as React from 'react'
import './SortingVisualizer.css'
import {randomizeArr} from "../array_randomizer/ArrayRandomizer";

interface Props {
    // fn: (arr: any[]) => any[];
}

interface State {
    array: any[];
}

export class SortingVisualizer extends React.Component<Props, State> {

    constructor(props: Readonly<Props> | Props) {
        super(props);
        this.state = {
            array: []
        };
    }

    componentDidMount() {
        const array = new Array(10);
        randomizeArr(array);
        this.setState({array});
    }

    render() {
        const {array}: any = this.state;
        return <>
            {array.map((value: any, idx: any) => {
                return (
                <div className="array-bar" key={idx}>
                    {value}
                </div>
                );
            })}
        </>
    }
}