export class BubbleSort {

    public static sort(sortTarget: any[], comparator: (objectA: any, objectB: any) => boolean): any[] {
        let swaps: number = 0;
        let length: number = sortTarget.length;
        do {
            swaps = 0;
            for (let i: number = 0; i < length - 1; i++) {
                if (comparator(sortTarget[i], sortTarget[i + 1])) {
                    this.swap(i, i + 1, sortTarget);
                    swaps++;
                }
            }
        } while (swaps != 0);
        return sortTarget;
    }

    private static swap(i: number, j: number, swapTarget: any[]): void {
        [swapTarget[i], swapTarget[j]] = [swapTarget[j], swapTarget[i]];
    }
}