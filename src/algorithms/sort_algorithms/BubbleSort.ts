import {SortingVisualizer} from "../../SortingVisualizer/SortingVisualizer";
import {sleep} from "../../utils/sleep";
import {VisArray} from "../../visualisable_datastructures/VisArray";

export class BubbleSort {

    public static async sort(sortTarget: any[], comparator: (objectA: any, objectB: any) => boolean, sv?: SortingVisualizer): Promise<any[]> {
        let swaps: number = 0;
        let length: number = sortTarget.length;
        do {
            swaps = 0;
            for (let i: number = 0; i < length - 1; i++) {
                if (sv?.sorting === false) return [];
                if (comparator(sortTarget[i], sortTarget[i + 1])) {
                    this.swap(i, i + 1, sortTarget);
                    swaps++;
                    if (sv) {
                        sv.setIDX(i, i+1);
                        sv.setState({array: sortTarget});
                        await sleep(sv.speed);
                        sv.setIDX(null, null);
                    }
                }
            }
        } while (swaps !== 0);
        return sortTarget;
    }

    public static async visSort(sortTarget: VisArray, comparator: (objectA: any, objectB: any) => boolean): Promise<void> {
        let swaps: number = 0;
        let length: number = sortTarget.len;
        do {
            swaps = 0;
            for (let i: number = 0; i < length - 1; i++) {
                try {
                    if (comparator(sortTarget.indArr(i), sortTarget.indArr(i + 1))) {
                        await sortTarget.swap(i, i + 1);
                        swaps++;
                    }
                } catch (e) {
                    return;
                }
            }
        } while (swaps !== 0);
    }

    private static swap(i: number, j: number, swapTarget: any[]): void {
        [swapTarget[i], swapTarget[j]] = [swapTarget[j], swapTarget[i]];
    }
}