export type trieNode = {
  nodes: { [key: string]: trieNode }
  weight?: number
}

export type weightedWord = [string, number]