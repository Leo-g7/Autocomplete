import { trieNode } from "../types"

class Trie {
  private root: trieNode = {}

  public insert = (word: string): void => {
    this.insertTrie(word)
  }

  private search = (word: string): trieNode | null => {
    return this.searchTrie(word)
  }

  private collectAllWords = (node: trieNode, word: string, words: string[] = []): string[] => {
    if (node['*']) words.push(word)

    for (const [key, value] of Object.entries(node)) {
      this.collectAllWords(value, word + key, words)
    }

    return words
  }

  public autoComplete = (word: string): string[] | null => {
    const currentNode = this.search(word)
    if (!currentNode) return null

    return this.collectAllWords(currentNode, word)
  }

  private insertTrie = (word: string, trieNode: trieNode = this.root, n: number = 0): void => {
    if (n < word.length) {
      if (!trieNode[word[n]]) trieNode[word[n]] = {}

      this.insertTrie(word, trieNode[word[n]], ++n);
    } else {
      trieNode["*"] = {}
    }
  }

  private searchTrie = (word: string, trieNode: trieNode = this.root, n: number = 0): trieNode | null => {
    let result: trieNode | null = trieNode[word[n]] || null

    if (n + 1 < word.length && trieNode[word[n]]) {
      result = this.searchTrie(word, trieNode[word[n]], ++n)
    }
    return result
  }
}

export default Trie