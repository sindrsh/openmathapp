function getRandomInt(min, max) {
    return Math.floor((Math.random() + min) * (max + 1));
}

function shuffleArray(arr) {
    arr.sort((a, b) => 0.5 - Math.random())
}

export { getRandomInt, shuffleArray }