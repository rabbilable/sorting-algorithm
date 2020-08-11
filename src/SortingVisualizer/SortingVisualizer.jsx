import React, { Component } from "react";
import "./SortingVisualizer.css";

import * as sortingAlgorithms from "../sortingAlgorithms/sortingAlgortithm";

const ANIMATION_SPEED_MS = 1;

const NUMBER_OF_ARRAY_BARS = 310;

const PRIMARY_COLOR = "turquoise";

const SECONDARY_COLOR = "red";
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
		const animations = sortingAlgorithms.getMergeSortAnimations(
			this.state.array
		);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementByClassName("array-bar");
			const isColorChange = i % 3 !== 2;
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const 
			}
		}
	}
	quickSort() {}
	heapSort() {}
	bubbleSort() {}

	testSortingAlgorithms() {
		for (let i = 0; i < 100; i++) {
			const array = [];
			const length = randomIntFromInterval(1, 1000);
			for (let i = 0; i < length; i++) {
				array.push(randomIntFromInterval(-1000, 1000));
			}
			const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
			const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
			console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
		}
	}

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
