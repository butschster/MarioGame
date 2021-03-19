export default class Timer {
    onTick: CallableFunction;
    updateProxy: any;

    constructor(deltaTime: number = 1 / 60) {
        let accumulatedTime = 0;
        let lastTime = 0;


        this.onTick = function nothingToDo(deltaTime: number) {
            console.log(deltaTime)
        };

        let time = 0;
        let lastTimestamp = Date.now();

        this.updateProxy = () => {
            const timestamp = Date.now();

            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.onTick(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;
            time += timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
    }
}