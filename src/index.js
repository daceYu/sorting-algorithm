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
		right = arr.slice(middle); // 分区间

	let merge = (left, right) => {
		let result = [];

		while (left.length && right.length) { // 两个区间都有值
			// 区间元素作比较，小的放在前面
			if (left[0] <= right[0]) {
				result.push(left.shift());
			} else {
				result.push(right.shift());
			}
		}

		// 只有一个区间
		while (left.length) result.push(left.shift());
		while (right.length) result.push(right.shift());

		return result;
	}
	
	return merge(mergeSort(left), mergeSort(right));
}

/**
 * 快排
 * @param {Array}  arr   : 需要排序的数组对象
 * @param {Number} left  : 分区以后左边的元素个数
 * @param {Number} right : 分区以后右边的元素个数
 */
let quickSort = (arr, left, right) => {
	let len = arr.length,
		partitionIndex,
		left = typeof left != "number" ? 0 : left,
		right = typeof right != "number" ? len - 1 : right;

	// 位置互换
	let swap = (arr, i, j) => {
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}

	// 分区操作
	let partition = (arr, left, right) => {
		let pivot = left, // 设定基准值
			index = pivot + 1;

		for (let i = index; i <= right; i++) {
			if (arr[i] < arr[pivot]) {
				swap(arr, i, index);
				index++;
			}
		}

		swap(arr, pivot, index - 1);
		return index - 1;
	}

	if (left < right) {
		partitionIndex = partition(arr, left, right);
		quickSort(arr, left, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1; right);	
	}
	return arr;
}

/* 堆排序 */
;(function () {
	let len;    //因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
	let buildMaxHeap = (arr) => {   //建立大顶堆
	    len = arr.length;
	    for (let i = Math.floor(len / 2); i >= 0; i--) {
	        heapify(arr, i);
	    }
	}

	let heapify = (arr, i) => {     //堆调整
	    let left = 2 * i + 1,
	        right = 2 * i + 2,
	        largest = i;
	    if (left < len && arr[left] > arr[largest]) {
	        largest = left;
	    }

	    if (right < len && arr[right] > arr[largest]) {
	        largest = right;
	    }

	    if (largest != i) {
	        swap(arr, i, largest);
	        heapify(arr, largest);
	    }
	}

	let swap = (arr, i, j) => {
	    let temp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = temp;
	}

	let heapSort = (arr) => {
	    buildMaxHeap(arr);
	    for (let i = arr.length - 1; i > 0; i--) {
	        swap(arr, 0, i);
	        len--;
	        heapify(arr, 0);
	    }
	    return arr;
	}
})()

/* 计数排序 */
let countingSort = (arr, maxValue) => {
    let bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    
    for (let i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (let j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
    return arr;
}

/* 桶排序 */
let bucketSort = (arr, bucketSize) => {
    if (arr.length === 0) return arr;

    let i;
    let minValue = arr[0],
    	maxValue = arr[0];

    for (i = 1; i < arr.length; i++) {
   	    if (arr[i] < minValue) {
        	minValue = arr[i]; // 输入数据的最小值
      	} else if (arr[i] > maxValue) {
        	maxValue = arr[i]; // 输入数据的最大值
        }
    }

    // 桶的初始化
    let DEFAULT_BUCKET_SIZE = 5;  // 设置桶的默认数量为5
    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1,
    	buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    //利用映射函数将数据分配到各个桶中
    for (i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (i = 0; i < buckets.length; i++) {
        insertionSort(buckets[i]);  // 对每个桶进行排序，这里使用了插入排序
        for (var j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);                      
        }
    }

    return arr;
}

/* 基数排序 */
;(function () {
	// LSD Radix Sort
	let counter = [];
	let radixSort = (arr, maxDigit) => {
	    let mod = 10,
	    	dev = 1;
	    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
	        for (let j = 0; j < arr.length; j++) {
	            let bucket = parseInt((arr[j] % mod) / dev);
	            if (counter[bucket] == null) counter[bucket] = [];
	            counter[bucket].push(arr[j]);
	        }

	        let pos = 0;
	        for(let j = 0; j < counter.length; j++) {
	            let value = null;
	            if (counter[j] != null) {
	                while ((value = counter[j].shift()) != null) {
	                    arr[pos++] = value;
	                }
	            }
	        }
	    }
	    return arr;
	}
})()