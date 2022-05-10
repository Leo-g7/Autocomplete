import { trieNode } from "../types"

class Trie {
  public root: trieNode = {}

  public insert = (word: string): void => {
    this.insertTrie(word)
  }

  public search = (word: string): trieNode | null => {
    return this.searchTrie(word)
  }

  private insertTrie = (word: string, trieNode: trieNode = this.root, n: number = 0): void => {
    if (n < word.length) {
      if (!trieNode[word[n]]) trieNode[word[n]] = {}
      const nextNode: trieNode = trieNode[word[n]]

      n++
      this.insertTrie(word, nextNode, n);
    } else {
      trieNode["*"] = {}
    }
  }

  private searchTrie = (word: string, trieNode: trieNode = this.root, n: number = 0): trieNode | null => {
    let result: trieNode | null = trieNode[word[n]] || null

    if (n + 1 < word.length && trieNode[word[n]]) {
      const nextNode: trieNode = trieNode[word[n]]

      n++
      result = this.searchTrie(word, nextNode, n)
    }
    return result
  }
}

export default Trie