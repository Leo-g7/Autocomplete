import inquirer from 'inquirer'
import promptSync from 'prompt-sync';
import Trie from './trie'

/*
  Instantiate a Trie object
  Create a prompt
  Clear the prompt
*/

const trie = new Trie()
const prompt = promptSync();
console.clear();

/*
  Run a CLI with 3 options in a loop
*/

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

/*
  Do something depending on the option selectioned in the CLI
*/

const cliRoot = (answer: string) => {
  if (answer === 'Insert new word') insert();
  else if (answer === 'Autocomplete') autoComplete();
  else process.exit()
}


/*
  Let the user enter a word and a weight
  If the values are correct insert it into the Instantiate Trie
*/

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

/*
  Let the user enter a word
  If the values is correct print all the words starting with this word
*/

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
