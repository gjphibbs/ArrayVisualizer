    export function randomizeArr(arr: number[]) {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = getRandomInt(5, 1000);
        }
    }

    export function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
