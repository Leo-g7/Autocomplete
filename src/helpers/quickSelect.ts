import { weightedWord } from '../types'
import { swap } from '.';

const defaultcomparator = (a: number, b: number): boolean => {
  return a < b;
};

const partition = (
  items: weightedWord[],
  leftIndex: number,
  rightIndex: number,
  pivotIndex: number,
  compare: (a: number, b: number) => boolean
) => {
  const pivotValue: number = items[pivotIndex][1];

  swap(items, pivotIndex, rightIndex);
  let storeIndex: number = leftIndex;

  for (let i: number = leftIndex; i < rightIndex; i += 1) {
    if (compare(pivotValue, items[i][1])) {
      swap(items, storeIndex, i);
      storeIndex += 1;
    }
  }
  swap(items, rightIndex, storeIndex);
  return storeIndex;
}

const quickSelect = (items: weightedWord[], size: number, comparator: (a: number, b: number) => boolean = defaultcomparator) => {
  const compare: (a: number, b: number) => boolean = comparator || defaultcomparator;

  if (items.length < size) {
    return items;
  }

  const index = select(items, size, compare);

  return items.slice(0, size);
}

const select = (items: weightedWord[], size: number, compare: (a: number, b: number) => boolean) => {
  let leftIndex: number = 0
  let rightIndex: number = items.length - 1

  while (true) {
    if (leftIndex == rightIndex) return leftIndex;

    let pivotIndex: number = leftIndex + Math.floor((rightIndex - leftIndex) / 2);

    pivotIndex = partition(items, leftIndex, rightIndex, pivotIndex, compare);
    if (size == pivotIndex) {
      return size;
    }
    if (size < pivotIndex) {
      rightIndex = pivotIndex - 1
    } else {
      leftIndex = pivotIndex + 1
    }
  }
}

export default quickSelect