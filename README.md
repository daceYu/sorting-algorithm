## sorting-algorithm

经常听到别人提排序算法，在这里做一个简单的归纳

### 简述

虽然说我是软工出身的，但是对于算法这一块比较薄弱，以前一直以为，前端工程师并不需要过多深入学习算法，在工作过程中，很快就知道这个观念是错误的，现在的我坚信一句话：学习某一个东西一定是会有帮助的，如果觉得这个东西对你帮助不大，那么可能说是你自身没有达到这个高度。

### 时间复杂度

有关时间复杂度的定义，可以在百度、google上查阅，这里只为留一个印象。

Ο(1) 表示基本语句的执行次数是一个常数，一般来说，只要算法中不存在循环语句，其时间复杂度就是 Ο(1) 。其中 Ο($log_2n$) 、Ο(n) 、 Ο($nlog_2n$)、Ο($n^2$) 和 Ο($n^3$) 称为多项式时间，而 Ο($2^n$)  和 Ο(n!) 称为指数时间。

常见的算法时间复杂度由小到大依次为：Ο(1)＜Ο($log_2n$)＜Ο(n)＜Ο($nlog_2n$)＜Ο($n^2$)＜Ο($n^3$)＜…＜Ο($2^n$)＜Ο(n!)

#### 经典算法对比

| 排序算法 |   平均时间复杂度    |     最好情况     |     最怀情况     |    空间复杂度     |   排序方式    | 稳定性  |
| :--: | :----------: | :----------: | :----------: | :----------: | :-------: | :--: |
| 冒泡排序 |   O($n^2$)   |     Ο(n)     |   O($n^2$)   |     Ο(1)     | In-place  |  稳定  |
| 选择排序 |   O($n^2$)   |   O($n^2$)   |   O($n^2$)   |     Ο(1)     | In-place  | 不稳定  |
| 插入排序 |   O($n^2$)   |     Ο(n)     |   O($n^2$)   |     Ο(1)     | In-place  |  稳定  |
| 希尔排序 | Ο($nlog_2n$) |     Ο(n)     |   O($n^2$)   |     Ο(1)     | In-place  | 不稳定  |
| 归并排序 | Ο($nlog_2n$) | Ο($nlog_2n$) | Ο($nlog_2n$) |     Ο(n)     | Out-place |  稳定  |
| 快速排序 | Ο($nlog_2n$) | Ο($nlog_2n$) |   O($n^2$)   | Ο($nlog_2n$) | In-place  | 不稳定  |
| 堆排序  | Ο($nlog_2n$) | Ο($nlog_2n$) | Ο($nlog_2n$) |     Ο(1)     | In-place  | 不稳定  |
| 计数排序 |   Ο(n + k)   |   Ο(n + k)   |   Ο(n + k)   |     Ο(k)     | Out-place |  稳定  |
| 桶排序  |   Ο(n + k)   |   Ο(n + k)   |   O($n^2$)   |   Ο(n + k)   | Out-place |  稳定  |
| 基数排序 |   Ο(n * k)   |   Ο(n * k)   |   Ο(n * k)   |   Ο(n + k)   | Out-place |  稳定  |

n：数据规模

k：‘桶’的个数

In-place：占用常数内存，不占用额外内存

out-place：占用额外内存

稳定性：排序

### 算法的实现

#### 冒泡排序

原理：每次循环将相邻的两个元素两两对比，大的放到后面。

##### 代码实现

```js
let bubbleSort = (arr) => {
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
```

##### 动图演示

![images](./resource/1.gif)

#### 选择排序

原理：每次循环都寻找最小的数，放到循环开始的位置。

##### 代码实现

```js
let selectionSort = (arr) => {
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
```

##### 动图演示

![images](./resource/2.gif)

#### 插入排序

原理：每次循环，当前元素都与之前所有的元素做对比，找到自己应该在的位置，然后插入

##### 代码实现

```js
let insertionSort = (arr) => {
	if (!arr) return false;

	let len = arr.length;
	let preIndex,
		current;
	for (let i = 1; i < len; i++) {
		preIndex = i - 1;
		current = arr[i];
        // 对比当前元素前面的值，判断是否为应该插入的地方
		while(preIndex >= 0 && arr[preIndex] > current) { 
			arr[preIndex + 1] = arr[preIndex]; // 元素后移
			preIndex--; // 自己最后应该所在的位置
		}
		arr[preIndex + 1] = current; // 插入
	}
	return arr;
}
```

##### 动图演示

![images](./resource/3.gif)

#### 希尔排序

原理：希尔排序是插入排序的一种更高效率的实现。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列。

##### 代码实现

```js
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
```

#### 归并排序

作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：

- 自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第2种方法）
- 自下而上的迭代

和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(n log n）的时间复杂度。代价是需要额外的内存空间

##### 代码实现

```js
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
```

##### 动图演示

![images](./resource/4.gif)

#### 快排

快速排序又是一种分而治之思想在排序算法上的典型应用。本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。

快速排序的名字起的是简单粗暴，因为一听到这个名字你就知道它存在的意义，就是快，而且效率高! 它是处理大数据最快的排序算法之一了。

> 快速排序的最坏运行情况是O($n^2$)，比如说顺序数列的快排。但它的平摊期望时间是O($nlog_2n$) ，且O($nlog_2n$)记号中隐含的常数因子很小，比复杂度稳定等于O($nlog_2n$)的归并排序要小很多。所以，对绝大多数顺序性较弱的随机数列而言，快速排序总是优于归并排序。

[快排为什么快?](https://blog.csdn.net/yzllz001/article/details/50982841)

##### 代码实现

```js
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
```

##### 动图演示

![imagse](./resource/5.gif)

#### 堆排序

堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：

1. 大顶堆：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于升序排列
2. 小顶堆：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于降序排列

##### 代码实现

```js
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
```

##### 动图演示

![images](./resource/6.gif)

#### 计数排序

计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。

##### 代码实现

```
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
```

##### 动图演示

![imagse](./resource/7.gif)

#### 桶排序

#### 基数排序