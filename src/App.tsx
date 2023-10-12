/// <reference lib="dom"/>

import { createRoot } from 'react-dom/client'
import { SearchParams } from './SearchParams'

const App = () => {
    return (
        <div className="App">
            <SearchParams />
        </div>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)