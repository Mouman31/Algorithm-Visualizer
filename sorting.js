let array = [];
let arraySize = 20; // Default array size
let delay = 300; // Default speed

// Update the array size based on the slider
function updateArraySizeLabel() {
    const arraySizeLabel = document.getElementById("arraySizeLabel");
    arraySize = document.getElementById("arraySize").value;
    arraySizeLabel.textContent = arraySize;
    generateArray();
}

// Update the speed based on the slider
function updateSpeedLabel() {
    const speedLabel = document.getElementById("speedLabel");
    delay = document.getElementById("speed").value;
    speedLabel.textContent = delay + "ms";
}

function generateArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    displayArray();
}

function displayArray() {
    const arrayContainer = document.getElementById("array-container");
    const containerWidth = arrayContainer.offsetWidth;
    arrayContainer.innerHTML = "";

    array.forEach((value, idx) => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${Math.max(5, containerWidth / arraySize - 2)}px`; // Dynamic width
        bar.classList.add("bar");
        bar.setAttribute("id", `bar-${idx}`);

        const barLabel = document.createElement("div");
        barLabel.textContent = value;
        barLabel.classList.add("bar-label");

        const barContainer = document.createElement("div");
        barContainer.classList.add("bar-container");
        barContainer.appendChild(bar);
        barContainer.appendChild(barLabel);

        arrayContainer.appendChild(barContainer);
    });
}


async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            let bar1 = document.getElementById(`bar-${j}`);
            let bar2 = document.getElementById(`bar-${j + 1}`);
            bar1.classList.add("searching");
            bar2.classList.add("searching");

            await sleep(delay);

            if (array[j] > array[j + 1]) {
                // Swap
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                displayArray();
            }

            bar1.classList.remove("searching");
            bar2.classList.remove("searching");
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            let bar1 = document.getElementById(`bar-${j}`);
            let bar2 = document.getElementById(`bar-${minIdx}`);
            bar1.classList.add("searching");
            bar2.classList.add("searching");

            await sleep(delay);

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }

            bar1.classList.remove("searching");
            bar2.classList.remove("searching");
        }
        // Swap if minIdx is different
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            displayArray();
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            let bar1 = document.getElementById(`bar-${j}`);
            let bar2 = document.getElementById(`bar-${j + 1}`);
            bar1.classList.add("searching");
            bar2.classList.add("searching");

            await sleep(delay);
            array[j + 1] = array[j];
            displayArray();

            bar1.classList.remove("searching");
            bar2.classList.remove("searching");
            j--;
        }
        array[j + 1] = key;
        displayArray();
    }
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        let bar1 = document.getElementById(`bar-${j}`);
        let bar2 = document.getElementById(`bar-${high}`);
        bar1.classList.add("searching");
        bar2.classList.add("searching");

        await sleep(delay);
        
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            displayArray();
        }

        bar1.classList.remove("searching");
        bar2.classList.remove("searching");
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    displayArray();
    return i + 1;
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(left, mid);
        await mergeSortHelper(mid + 1, right);
        await merge(left, mid, right);
    }
}

async function merge(left, mid, right) {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        let bar1 = document.getElementById(`bar-${k}`);
        let bar2 = document.getElementById(`bar-${mid + 1 + j}`);
        bar1.classList.add("searching");
        bar2.classList.add("searching");

        await sleep(delay);

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        displayArray();
        bar1.classList.remove("searching");
        bar2.classList.remove("searching");
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        i++;
        k++;
        displayArray();
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        j++;
        k++;
        displayArray();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the array
generateArray();
