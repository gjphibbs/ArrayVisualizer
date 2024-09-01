import {SortingVisualizer} from "../SortingVisualizer/SortingVisualizer";
import {sleep} from "../utils/sleep";

export class VisArray {
    private readonly arr: any[];
    private sv: SortingVisualizer
    public len: number;

    constructor(a: any[], s: SortingVisualizer) {
        this.arr = a;
        this.sv = s;
        this.len = a.length;
    }

    async indArr (idx: number): Promise<any> {
        await this.sv.waitForPaused();
        if (!this.sv.sorting) throw new CancelError();
        if (idx < 0 || idx > (this.arr.length - 1)) throw new IdxError("bad Index in indArr");
        return this.arr[idx];
    }

    async setArr (idx: number, value: any): Promise<void> {
        await this.sv.waitForPaused();
        if (!this.sv.sorting) throw new CancelError();
        if (idx < 0 || idx > (this.arr.length - 1)) throw new IdxError("bad Index in indArr");
        this.arr[idx] = value;
        this.sv.setState({array: this.arr});
    }

    async swap(i: number, j: number): Promise<void> {
        await this.sv.waitForPaused();
        if (!this.sv.sorting) throw new CancelError();
        if (i < 0 || i > (this.arr.length - 1)) throw new IdxError("bad Index in indArr");
        if (j < 0 || j > (this.arr.length - 1)) throw new IdxError("bad Index in indArr");
        this.sv.setState({array: this.arr});
        this.sv.setIDX(i, j);
        await sleep(this.sv.speed);
        this.sv.setIDX(null, null);
        [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    }
    
}

class IdxError extends Error {

}

class CancelError extends Error {

}