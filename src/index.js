/*!
 * 排序算法归纳
 * @Author: 行知<daceyu@aliyun.com>
 */

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];

/* 冒泡排序 */
let bubbleSotr = (arr) => {
	if (!arr) return false;

	let len = arr.length;
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - 1 - i; j++) { // j < len - 1 - i； 减少循环区间
			if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
				let temp = arr[j + 1]; // 元素交换
				arr[j + 1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

/* 选择排序 */
let selectionSort = (arr) => {
	if (!arr) return false;

	let len = arr.length;
	let minIndex,
		temp;
	for (let i = 0; i < len - 1; i++) {
		minIndex = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[j] < arr[minIndex]) { // 寻找最小的数
				minIndex = j;  // 保存最小数的下标序号
			}
		}
		// 元素交换
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	}
	return arr;
}

/* 插入排序 */
let insertionSort = (arr) => {
	if (!arr) return false;

	let len = arr.length;
	let preIndex,
		current;
	for (let i = 1; i < len; i++) {
		preIndex = i - 1;
		current = arr[i];
		while(preIndex >= 0 && arr[preIndex] > current) { // 对比当前元素前面的值，判断是否为应该插入的地方
			arr[preIndex + 1] = arr[preIndex]; // 元素后移
			preIndex--; // 自己最后应该所在的位置
		}
		arr[preIndex + 1] = current; // 插入
	}
	return arr;
}

/* 希尔排序 */
let shellSort = (arr) => {
    let len = arr.length,
        temp,
        gap = 1;

    //动态定义间隔序列
    while (gap < len / 3) { gap = gap * 3 + 1; }

    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}

/* 归并排序 */
let mergeSort = (arr) => {
	let len = arr.length;
	if (len < 2) { return arr; }

	let middle = Math.floor(len / 2),
		left = arr.slice(0, middle),
		right = arr.slice(middle);

	let merge = (left, right) => {
		let result = [];

		while (left.length && right.length) {
			if (left[0] <= right[0]) {
				result.push(left.shift());
			} else {
				result.push(right.shift());
			}
		}

		while (left.length) result.push(left.shift());
		while (right.length) result.push(right.shift());

		return result;
	}
	
	return merge(mergeSort(left), mergeSort(right));
}

/* 快排 */

