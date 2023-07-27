// Bubble Sort Algorithm Section
function bubbleSort() {
    const input = document.getElementById("bubble-sort-input").value;
    const elements = input.trim().split(" ").map(Number);
    const n = elements.length;

    const resultDiv = d3.select("#bubble-sort-result");
    resultDiv.selectAll("*").remove();
    const svg = resultDiv.append("svg");
    const barWidth = 40;
    const xScale = d3.scaleBand().domain(elements).range([0, elements.length * barWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(elements)]).range([0, 200]);

    // Function to update the visualization
    function updateVisualization(arr) {
        const svg = resultDiv.select("svg");

        // Remove existing elements
        svg.selectAll("*").remove();

        const barWidth = 40;
        const xScale = d3.scaleBand().domain(arr.map((_, i) => i)).range([0, arr.length * barWidth]);
        const yScale = d3.scaleLinear().domain([0, d3.max(arr)]).range([0, 200]);

        // Append the bars representing original values
        svg.selectAll("rect")
            .data(arr)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", 200)
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .attr("fill", "blue")
            .attr("class", "original-bar") // Add class for styling original bars
            .transition() // Add animation for sorting
            .duration(300)
            .ease(d3.easeLinear) // Add easing to make it smoother
            .attr("y", (d) => 200 - yScale(d))
            .attr("height", (d) => yScale(d));

        // Append labels indicating the original position of each bar
        svg.selectAll("text")
            .data(arr)
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
            .attr("y", (d) => 200 - yScale(d) - 5) // Adjust label positioning
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .attr("class", "original-label") // Add class for styling original labels
            .transition() // Add animation for sorting
            .duration(300)
            .ease(d3.easeLinear) // Add easing to make it smoother
            .attr("y", (d) => 200 - yScale(d) - 15); // Adjust label positioning

        // Add labels to sorted bars after the sorting is complete
        setTimeout(() => {
            svg.selectAll(".original-bar")
                .attr("class", "sorted-bar") // Change class for styling sorted bars
                .attr("fill", "green");

            svg.selectAll(".original-label")
                .attr("class", "sorted-label") // Change class for styling sorted labels
                .attr("fill", "white");
        }, 300 * arr.length);
    }

    // Function to perform bubble sort with animation
    function performBubbleSort(arr, i) {
        if (i < n - 1) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // Update visualization after each pass
            svg.selectAll("*").remove();
            updateVisualization(arr);

            // Check if any swaps happened in the pass
            if (swapped) {
                setTimeout(() => {
                    performBubbleSort(arr, i + 1);
                }, 100); // Reduced delay between each pass
            } else {
                // Sorting completed, show the final result
                svg.selectAll("*").remove();
                updateVisualization(arr);
            }
        } else {
            // Sorting completed, show the final result
            svg.selectAll("*").remove();
            updateVisualization(arr);
        }
    }

    // Start the sorting process
    performBubbleSort(elements, 0);
}



// Binary Search Algorithm Section
function binarySearch() {
    const inputList = document.getElementById("binary-search-list").value
        .trim().split(" ").map(Number).sort((a, b) => a - b);
    const key = parseInt(document.getElementById("search-key").value);

    const resultDiv = d3.select("#search-result");
    resultDiv.text("Searching...");
    resultDiv.attr("class", "mt-4 text-gray-700");

    const svg = d3.select("#binary-search-result").append("svg")
        .attr("width", "100%")
        .attr("height", 200);

    let left = 0;
    let right = inputList.length - 1;
    let found = false;

    function searchStep() {
        if (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const xScale = d3.scaleBand().domain(inputList).range([0, inputList.length * 40]);

            svg.selectAll(".bar").remove();
            svg.selectAll(".bar")
                .data(inputList)
                .enter()
                .append("rect")
                .attr("x", (d, i) => xScale(d))
                .attr("y", 0)
                .attr("width", xScale.bandwidth())
                .attr("height", 40)
                .attr("fill", (d, i) => i === mid ? "yellow" : "blue")
                .attr("class", "bar");

            resultDiv.text(`Searching... Current Range: ${inputList.slice(left, right + 1).join(", ")}`);
            if (inputList[mid] === key) {
                svg.selectAll(".bar")
                    .attr("fill", (d, i) => i === mid ? "green" : "blue");
                resultDiv.text(`Key '${key}' found at index ${mid}`);
                resultDiv.attr("class", "mt-4 text-green-700");
                found = true;
            } else if (inputList[mid] < key) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
            setTimeout(searchStep, 1000); // Add delay for the next step
        } else {
            if (!found) {
                resultDiv.text(`Key '${key}' not found.`);
                resultDiv.attr("class", "mt-4 text-red-700");
            }
            svg.selectAll(".bar")
                .attr("fill", "blue");
        }
    }

    searchStep();
}

// Ternary Search Algorithm Section
function ternarySearch() {
    const inputList = document.getElementById("ternary-search-list").value.trim().split(" ").map(Number).sort((a, b) => a - b);
    const key = parseInt(document.getElementById("ternary-search-key").value);

    const resultDiv = d3.select("#ternary-search-result");
    resultDiv.text("Searching...");
    resultDiv.attr("class", "mt-4 text-gray-700");

    const svg = d3.select("#ternary-search-result").append("svg")
        .attr("width", "100%")
        .attr("height", 200);

    function searchStep(left, right) {
        if (left <= right) {
            const partitionSize = Math.floor((right - left) / 3);
            const mid1 = left + partitionSize;
            const mid2 = right - partitionSize;
            const xScale = d3.scaleBand().domain(inputList).range([0, inputList.length * 40]);

            svg.selectAll(".bar").remove();
            svg.selectAll(".bar")
                .data(inputList)
                .enter()
                .append("rect")
                .attr("x", (d, i) => xScale(d))
                .attr("y", 0)
                .attr("width", xScale.bandwidth())
                .attr("height", 40)
                .attr("fill", (d, i) => (i === mid1 || i === mid2) ? "yellow" : "blue")
                .attr("class", "bar");

            if (inputList[mid1] === key) {
                svg.selectAll(".bar")
                    .attr("fill", (d, i) => (i === mid1 || i === mid2) ? "green" : "blue");
                resultDiv.text(`Key '${key}' found at index ${mid1}`);
                resultDiv.attr("class", "mt-4 text-green-700");
                return;
            } else if (inputList[mid2] === key) {
                svg.selectAll(".bar")
                    .attr("fill", (d, i) => (i === mid1 || i === mid2) ? "green" : "blue");
                resultDiv.text(`Key '${key}' found at index ${mid2}`);
                resultDiv.attr("class", "mt-4 text-green-700");
                return;
            } else if (key < inputList[mid1]) {
                searchStep(left, mid1 - 1);
            } else if (key > inputList[mid2]) {
                searchStep(mid2 + 1, right);
            } else {
                searchStep(mid1 + 1, mid2 - 1);
            }
        } else {
            resultDiv.text(`Key '${key}' not found.`);
            resultDiv.attr("class", "mt-4 text-red-700");
            svg.selectAll(".bar")
                .attr("fill", "blue");
        }
    }

    searchStep(0, inputList.length - 1);
}