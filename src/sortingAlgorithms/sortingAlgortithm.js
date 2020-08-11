// export const mergeSort = (arr) => {
// 	if (arr.length <= 1) return arr;
// 	let mid = Math.floor(arr.length / 2),
// 		left = mergeSort(arr.slice(0, mid)),
// 		right = mergeSort(arr.slice(mid));

// 	return merge(left, right);
// };

// const merge = (arr1, arr2) => {
// 	let sorted = [];

// 	while (arr1.length && arr2.length) {
// 		if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
// 		else sorted.push(arr2.shift());
// 	}

// 	return sorted.concat(arr1.slice().concat(arr2.slice()));
// };
export function getMergeSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;
	const auxilaryArray = array.slice();
	mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
	return animations;
}

function mergeSortHelper(
	mainArray,
	startIdx,
	endIdx,
	auxilaryArray,
	animations
) {
	if (startIdx === endIdx) return;
	const middleIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(auxilaryArray, startIdx, middleIdx, mainArray, animations);
	mergeSortHelper(auxilaryArray, middleIdx + 1, endIdx, mainArray, animations);
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxilaryArray, animations);
}

function doMerge(
	mainArray,
	startIdx,
	middleIdx,
	endIdx,
	auxilaryArray,
	animations
) {
	let k = startIdx;
	let i = startIdx;
	let j = middleIdx + 1;
	while (i <= middleIdx && j <= endIdx) {
		animations.push([i, j]);
		animations.push([i, j]);
		if (auxilaryArray[i] <= auxilaryArray[j]) {
			animations.push([k, auxilaryArray[i]]);
			mainArray[k++] = auxilaryArray[j++];
		}
		while (i <= middleIdx) {
			animations.push([i, i]);
			animations.push([i, i]);

			animations.push([k, auxilaryArray[i]]);
			mainArray[k++] = auxilaryArray[i++];
		}
		while (j <= endIdx) {
			animations.push([j, j]);
			animations.push([j, j]);

			animations.push([k, auxilaryArray[j]]);
			mainArray[k++] = auxilaryArray[j++];
		}
	}
}
