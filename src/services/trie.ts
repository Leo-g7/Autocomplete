import { trieNode, weightedWord } from "../types/index"
import quickSelect from "../helpers/quickSelect"
import quickSort from "../helpers/quickSort"

class Trie {

  /*
    The root is the first trieNode of the Trie
  */

  private root: trieNode = { nodes: {} }

  /*
    Travers our trieNodes with word letters as keys
    If trieNode existe continue
    Else create the node
    At the end Create a node with the charactere * and the weight of the word
  */

  public insert = (word: string, weight: number): void => {
    let actualNode: trieNode = this.root

    for (let n = 0; n < word.length; n++) {
      if (!actualNode.nodes[word[n]]) actualNode.nodes[word[n]] = { nodes: {} }
      actualNode = actualNode.nodes[word[n]]
    }
    actualNode.nodes["*"] = { nodes: {}, weight: weight }
  }

  /*
    Travers our trieNodes with word letters as keys
    If trieNode existe continue
    Else return null
  */

  private search = (word: string): trieNode | null => {
    let actualNode: trieNode = this.root

    for (let n = 0; n < word.length; n++) {
      if (actualNode.nodes[word[n]]) actualNode = actualNode.nodes[word[n]]
      else return null
    }

    return actualNode
  }

  /*
    Travers all the possible key and their children starting from parameter node in recursion
    Each times a * is found push a couple [weight,word] to the list words
  */

  private collectAllWords = (node: trieNode, word: string, words: weightedWord[] = []): weightedWord[] => {
    if (node.nodes['*'] && node.nodes['*'].weight) words.push([word, node.nodes['*'].weight])

    for (const [key, value] of Object.entries(node.nodes)) {
      this.collectAllWords(value, word + key, words)
    }

    return words
  }

  /*
    Search if parameter word is in the Trie
    If not return empty list
    Else get an list if couple [word,weight]
    Use this list to shot words by weight and selecte the top 3 values
    Return the top 3 or less words
  */

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