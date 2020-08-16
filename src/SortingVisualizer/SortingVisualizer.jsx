import React, { Component } from "react";
import "./SortingVisualizer.css";

import { getMergeSortAnimations } from "../algorithms/mergeSort";

const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 5
const ACCESSED_COLOUR = "turquoise";
const SORTED_COLOUR = "green";

export class SortingVisualizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
			
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
			array.push(randomIntFromInterval(5, 730));
		}
		this.setState({ array });
	}

	mergeSort() {
		const animations = mergeSort.getMergeSortAnimations(this.state.array);
		console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("array-bar");
			// console.log(arrayBars);
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	quickSort() {}
	heapSort() {}
	bubbleSort() {}
	render() {
		const { array } = this.state;
		return (
			<div className="container array-container">
				{array.map((value, idx) => (
					<div
						className="array-bar"
						key={idx}
						style={{
							// backgroundColor: PRIMARY_COLOR,
							height: `${value / 2}px`,
						}}
					></div>
				))}
				<div className="button-group">
					<button
						onClick={() => this.resetArray()}
						className="btn btn-sml btn-success"
					>
						Generate New Array
					</button>
					<button
						onClick={() => this.mergeSort()}
						className="btn btn-sml btn-warning"
					>
						Merge Sort
					</button>
					<button
						onClick={() => this.resetArray()}
						className="btn btn-sml btn-danger"
					>
						Quick Sort
					</button>
					<button
						onClick={() => this.resetArray()}
						className="btn btn-sml btn-danger"
					>
						Heap Sort
					</button>
					<button
						onClick={() => this.resetArray()}
						className="btn btn-sml btn-danger"
					>
						Bubble Sort
					</button>
					<button
						onClick={() => this.testSortingAlgorithms()}
						className="btn btn-sml btn-light"
					>
						Test array
					</button>
				</div>
			</div>
		);
	}
}
function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
	console.log("unsorted", arrayOne);
	console.log("sorted", arrayTwo);
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) return false;
	}
	return true;
}
