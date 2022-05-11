import { weightedWord } from '../types'
import { swap } from '.';

const partition = (items: weightedWord[], left: number, right: number): number => {
  let pivot: weightedWord = items[Math.floor((right + left) / 2)],
    i: number = left,
    j: number = right

  while (i <= j) {
    while (items[i][1] > pivot[1]) {
      i++;
    }

    while (items[j][1] < pivot[1]) {
      j--;
    }

    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

const quickSort = (items: weightedWord[], left: number = 0, right: number = items.length - 1): weightedWord[] => {
  let index: number;

  if (items.length > 1) {
    index = partition(items, left, right);

    if (left < index - 1) {
      quickSort(items, left, index - 1);
    }

    if (index < right) {
      quickSort(items, index, right);

    }
  }

  return items;
}

export default quickSort