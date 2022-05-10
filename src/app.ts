import Trie from "./services/trie";

const trie = new Trie()

trie.insert("hell")
trie.insert("hello")
trie.insert("hello world!")
trie.insert("cat")

console.log(trie.search("hell"))
console.log(trie.search("helloo"))
