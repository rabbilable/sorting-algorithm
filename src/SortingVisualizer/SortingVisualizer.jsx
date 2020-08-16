import React, { Component } from "react";
import "./SortingVisualizer.css";

import { getMergeSortAnimations } from "../algorithms/mergeSort";

const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 5;
const ACCESSED_COLOUR = "turquoise";
const SORTED_COLOUR = "green";

export class SortingVisualizer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			arr: [],
			setArr: [],
			isSorting: false,
			setIsSorting: false,
			isSorted: false,
			setIsSorted: false,
			containerRef: null,
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		if (this.state.isSorting) return;
		if (this.state.isSorted) this.resetArrayColor();
		this.setState({ setIsSorted: false });
		const arr = [];
		for (let i = 0; i < ARR_LEN; i++) {
			arr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
		}
		shuffle(arr);
		this.setState({ arr: arr });
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.arr);
		this.animateArrayUpdate(animations);
	}

	quickSort() {}
	heapSort() {}
	bubbleSort() {}

	animateArrayUpdate(animations) {
		if (this.state.isSorting) return;
		this.setState({ setIsSorting: true });
		animations.forEach(([comparison, swapped], index) => {
			setTimeout(() => {
				if (!swapped) {
					if (comparison.length === 2) {
						// console.log(comparison);
						const [i, j] = comparison;
						this.animateArrayAccess(i);
						this.animateArrayAccess(j);
					} else {
						const [i] = comparison;
						this.animateArrayAccess(i);
					}
				} else {
					const [k, newValue] = comparison;
					this.setState((state) => {
						console.log("k:",k, "nv:",newValue);
						const newArr = [...state.setArr];
						// console.log(newArr);
					});
				}
			}, index * DELAY);
		});
		setTimeout(() => {
			this.animateSortedArray();
		}, animations.length * DELAY);
	}

	animateArrayAccess() {
		console.log("working");
	}
	animateSortedArray() {
		console.log("dskjds");
	}
	resetArrayColor() {
		console.log("dsjhsd");
	}
	render() {
		const { arr } = this.state;
		return (
			<div className="container array-container">
				{arr.map((value, idx) => (
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
const shuffle = (arr) => {
	for (let i = arr.length - 1; i >= 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));
		const temp = arr[i];
		arr[i] = arr[randomIndex];
		arr[randomIndex] = temp;
	}
};
