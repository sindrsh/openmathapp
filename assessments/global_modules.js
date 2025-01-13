function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function shuffleArray(arr) {
    arr.sort((a, b) => 0.5 - Math.random())
}

function getInts(start, end) {
    let ints = [];
    [...Array(end + 1 - start).keys()].forEach((i) => ints.push(i + start))
    return ints;
}


export { getRandomInt, shuffleArray, getInts }