import './App.css'
import SearchForm from './components/SearchForm'

function App() {
  return (
    <div className="App">
      <p>This page is a demonstration of the Levenshtein Distance algorithm, where the similarity between words is measured based on the minimum number of single-character edits required to change one word into another.</p>
      <p>Try entering a <b>misspelled</b> word in the search box below to find similar words in the dictionary.</p>
      <p>The source code for the backend of this demo is available on GitHub. <a href="https://github.com/pretzeloverdose/WordSearchBackEnd" target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
      <SearchForm />
    </div>
  )
}

export default App
