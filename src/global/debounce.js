export default (fn, delay) => {
    let timerID;

    return function (...args) {
        if (timerID) {
            clearTimeout(timerID);
        }

        timerID = setTimeout(() => {
            fn(...args);
            timerID = null;
        }, delay);
    }
}
