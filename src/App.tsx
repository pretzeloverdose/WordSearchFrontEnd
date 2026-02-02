import './App.css'
import SearchForm from './components/SearchForm'

function App() {
  return (
    <div className="App">
      <p>This page is a demonstration of the Levenshtein Distance algorithm, where the similarity between words is measured based on the minimum number of single-character edits required to change one word into another.</p>
      <p>Try entering a <b>misspelled</b> word in the search box below to find similar words in the dictionary.</p>
      <p>The source code for the backend of this demo is available on GitHub. <a href="https://github.com/pretzeloverdose/WordSearchBackEnd" target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      <SearchForm />
      <h3>How It Works</h3>
      <p>The Levenshtein Distance algorithm calculates the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one word into another. This allows us to measure the similarity between words and find the closest matches to a misspelled word.</p>
      <h3>Example</h3>
      <p>For instance, if you enter the word "<b>exampel</b>", the algorithm will identify "<b>example</b>" as a similar word because it only requires two character substitutions (changing 'l' to 'e' and 'e' to 'l') to correct the spelling.</p>
      <p>Feel free to experiment with different misspelled words to see how the algorithm performs!</p>
      <h3>The Psuedocode</h3>
      <p>Here str1 is the misspelled word and str2 is a word from the dictionary. The "distance" returned represents the minimum number of single-character edits required to transform str1 into str2.</p>
      <div style={{width: 'fit-content', margin: '0 auto', textAlign: 'left', backgroundColor: '#f4f4f4', padding: 10, borderRadius: 5}}>
      <pre style={{ textAlign: 'left', margin: 0, fontFamily: 'monospace', fontSize: '14px' }}>
{`function levenshteinDistance(str1, str2):
  if length of str1 is 0:
    return length of str2
  if length of str2 is 0:
    return length of str1

  create a matrix of size (length of str1 + 1) x (length of str2 + 1)

  for i from 0 to length of str1:
    matrix[i][0] = i
  for j from 0 to length of str2:
    matrix[0][j] = j

  for i from 1 to length of str1:
    for j from 1 to length of str2:
      if str1[i - 1] == str2[j - 1]:
        cost = 0
      else:
        cost = 1

      matrix[i][j] = minimum(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      )

  return matrix[length of str1][length of str2]`}
      </pre>
      </div>
    </div>
  )
}

export default App
