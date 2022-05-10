import Trie from "./services/trie";

const trie = new Trie()

trie.insert("ab")
trie.insert("abc")
trie.insert("acb")
trie.insert("abcd")
trie.insert("e")

console.log(trie.autoComplete('a'))
