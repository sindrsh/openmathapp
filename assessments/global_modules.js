function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function shuffleArray(arr) {
    arr.sort((a, b) => 0.5 - Math.random())
}

export { getRandomInt, shuffleArray }