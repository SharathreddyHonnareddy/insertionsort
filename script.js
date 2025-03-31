const arrayContainer = document.getElementById("array-container");
const stepsList = document.getElementById("steps-list");
let array = [];

// Function to generate a random array
function generateArray() {
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 10);
    
    // Clear previous steps
    stepsList.innerHTML = "";
    
    // Render the array visually
    renderArray(array);
}

// Function to render the array as bars with numbers
function renderArray(array) {
    arrayContainer.innerHTML = "";
    
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; // Scale height for better visualization
        
        const barNumber = document.createElement("div");
        barNumber.classList.add("bar-number");
        barNumber.innerText = value;

        bar.appendChild(barNumber);
        arrayContainer.appendChild(bar);
    });
}

// Insertion Sort with HD animation and step logging
async function insertionSort(array) {
    const bars = document.querySelectorAll(".bar");

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        // Highlight the current key being sorted
        bars[i].classList.add("key");
        
        logStep(`Inserting ${key} into the sorted portion`);

        while (j >= 0 && array[j] > key) {
            // Highlight the comparison bars
            bars[j].classList.add("compare");

            // Swap heights visually
            await new Promise(resolve => setTimeout(resolve, 500)); // Pause for animation
            
            bars[j + 1].style.height = bars[j].style.height;

            // Update the display number to reflect the swap
            bars[j + 1].querySelector(".bar-number").innerText = array[j];

            logStep(`Comparing ${key} with ${array[j]} | Moving ${array[j]} one position ahead`);

            array[j + 1] = array[j];
            j--;

            // Remove highlight from comparison bar
            if (j >= 0) bars[j + 1].classList.remove("compare");
        }

        // Place the key in its correct position
        await new Promise(resolve => setTimeout(resolve, 500));
        
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].querySelector(".bar-number").innerText = key; // Update display number
        
        array[j + 1] = key;

        logStep(`Placed ${key} at index ${j + 1}`);

        // Remove highlight from the current key bar and mark sorted portion as green
        bars[i].classList.remove("key");
        
        for (let k = j + 1; k <= i; k++) {
            bars[k].classList.add("correct");
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        logStep(`Sorted portion so far: [${array.slice(0, i + 1).join(", ")}]`);
        
        if (i === array.length - 1) logStep("Sorting Complete!");
        
        // Clear comparison highlights after each iteration
        for (let k = j + 1; k <= i; k++) {
            bars[k].classList.remove("compare");
        }
        
        if (j >= -1) bars[j + 1].classList.remove("compare"); // Ensure no lingering highlights
   }
}

// Log each step in the steps list dynamically
function logStep(step) {
   const stepItem = document.createElement("li");
   stepItem.innerText = step;

   stepsList.appendChild(stepItem);
}

// Start sorting when button is clicked
function startSorting() {
   if(array.length === 0){
       alert('Please generate an array first!'); 
       return;
   }
   stepsList.innerHTML=''; 
   insertionSort(array);
}

// Initial rendering of the empty container
generateArray();
