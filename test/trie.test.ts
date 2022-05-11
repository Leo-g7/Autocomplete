import Trie from "../src/services/trie";

describe('Test Trie class', () => {
  test('Case it works', () => {
    const trie = new Trie()

    trie.insert('ab', 1)
    trie.insert('abc', 3)

    expect(trie.autoComplete('a')).toEqual(['abc', 'ab']);

    trie.insert('abcd', 2)

    expect(trie.autoComplete('a')).toEqual(['abc', 'abcd', 'ab']);

    trie.insert('a', 4)

    expect(trie.autoComplete('a')).toEqual(['a', 'abc', 'abcd']);
  })

  test('Case it does not works', () => {
    const trie = new Trie()

    trie.insert('zy', 2)
    trie.insert('zyx', 3)

    expect(trie.autoComplete('a')).not.toEqual(['abc', 'ab']);

    trie.insert('zyxw', 4)

    expect(trie.autoComplete('a')).not.toEqual(['zy', 'zyx', 'zyxw']);

    trie.insert('zyxwv', 1)

    expect(trie.autoComplete('a')).not.toEqual(['zyxwv', 'zyxw', 'zyx']);
  })
})