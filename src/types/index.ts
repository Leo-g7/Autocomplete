/*
  trieNode is a Node in the Trie class
  The nodes property contain a dictionnary of key string trieNode value
  The weight property is only present in a node that is at the end of a word
  It contain the weight of the word
*/

export type trieNode = {
  nodes: { [key: string]: trieNode }
  weight?: number
}

/*
  WeightedWord is a couple of word:string and weight:number
  It permit to easily sort words by weight
*/

export type weightedWord = [string, number]
