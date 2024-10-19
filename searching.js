let array = [];
let arraySize = 20;
let delay = 300; 

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


async function linearSearch() {
    let searchValue = prompt("Enter value to search (Linear Search): ");
    for (let i = 0; i < array.length; i++) {
        let bar = document.getElementById(`bar-${i}`);
        bar.classList.add("searching");
        await sleep(delay);
        if (array[i] == searchValue) {
            alert("Value found!");
            bar.classList.add("active");
            return;
        }
        bar.classList.remove("searching");
    }
    alert("Value not found.");
}

async function binarySearch() {
    let searchValue = prompt("Enter value to search (Binary Search): ");
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let barMid = document.getElementById(`bar-${mid}`);
        barMid.classList.add("searching");
        
        await sleep(delay);

        if (array[mid] === Number(searchValue)) {
            alert("Value found!");
            barMid.classList.add("active");
            return;
        }

        barMid.classList.remove("searching");
        
        if (array[mid] < searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    alert("Value not found.");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the array
generateArray();
