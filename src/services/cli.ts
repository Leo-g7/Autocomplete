import inquirer from 'inquirer'
import promptSync from 'prompt-sync';
import Trie from './trie'

const trie = new Trie()
const prompt = promptSync();
console.clear();

const runCli = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'actions',
        message: 'Choose an action:',
        choices: ['Insert new word', 'Autocomplete', 'Exit']
      }
    ]).then(answers => {

      cliRoot(answers.actions)
    }).finally(() => {
      runCli()
    })
}

const cliRoot = (answer: string) => {
  if (answer === 'Insert new word') insert();
  else if (answer === 'Autocomplete') autoComplete();
  else process.exit()
}

const insert = () => {
  console.log('\n')
  const word: string = prompt('Enter a word:').toLowerCase();


  const weight: string = prompt('Enter a weight:');

  if (word && !isNaN(Number(weight))) {
    trie.insert(word, Number(weight))
    console.log(word + ' was inserted\n')
  }
  else if (!word) console.log('Incorrect word\n')
  else if (isNaN(Number(weight))) console.log('Incorrect weight\n')
}

const autoComplete = () => {
  console.log('\n')

  const word: string = prompt('Enter the string to complete:').toLowerCase();

  if (word) {
    const autoCompleteValues = trie.autoComplete(word)
    console.log('\nAutocomplete:')

    for (const autoCompleteValue of autoCompleteValues) console.log(autoCompleteValue)
  }
  console.log('\n')
}

export default runCli
