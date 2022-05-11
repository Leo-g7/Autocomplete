import { trieNode, weightedWord } from "../types/index"
import quickSelect from "../helpers/quickSelect"
import quickSort from "../helpers/quickSort"

class Trie {
  public root: trieNode = { nodes: {} }

  public insert = (word: string, weight: number): void => {
    let actualNode: trieNode = this.root

    for (let n = 0; n < word.length; n++) {
      if (!actualNode.nodes[word[n]]) actualNode.nodes[word[n]] = { nodes: {} }
      actualNode = actualNode.nodes[word[n]]
    }
    actualNode.nodes["*"] = { nodes: {}, weight: weight }
  }

  private search = (word: string): trieNode | null => {
    let actualNode: trieNode = this.root

    for (let n = 0; n < word.length; n++) {
      if (actualNode.nodes[word[n]]) actualNode = actualNode.nodes[word[n]]
      else return null
    }

    return actualNode
  }

  private collectAllWords = (node: trieNode, word: string, words: weightedWord[] = []): weightedWord[] => {
    if (node.nodes['*'] && node.nodes['*'].weight) words.push([word, node.nodes['*'].weight])

    for (const [key, value] of Object.entries(node.nodes)) {
      this.collectAllWords(value, word + key, words)
    }

    return words
  }

  public autoComplete = (word: string): string[] => {
    const currentNode = this.search(word)

    if (!currentNode) return []

    const weightedWords: weightedWord[] = this.collectAllWords(currentNode, word)

    const sortedWeightedWords: weightedWord[] = quickSelect(quickSort(weightedWords), 3)

    const words: string[] = sortedWeightedWords.map((sortedWeightedWord: weightedWord) => {
      return sortedWeightedWord[0]
    })

    return words
  }
}

export default Trie