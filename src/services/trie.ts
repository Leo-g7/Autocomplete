import { trieNode } from "../types"

class Trie {
  public root: trieNode = {}

  public insert = (word: string): void => {
    this.insertNewWord(word)
  }

  private insertNewWord = (word: string, trieNode: trieNode = this.root, n: number = 0): void => {
    if (n < word.length) {
      if (!trieNode[word[n]]) trieNode[word[n]] = {}

      const newNode: trieNode = trieNode[word[n]]

      n++
      this.insertNewWord(word, newNode, n);
    } else {
      trieNode["*"] = {}
    }
  }
}

export default Trie