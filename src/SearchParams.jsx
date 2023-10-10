import { useEffect, useState } from 'react'
import { searchByTitle } from './MangaDexAPI'
import { Manga } from './Manga'

export const SearchParams = () => {
    const [input, setInput] = useState('')
    const [items, setItems] = useState([{}])

    useEffect(() => {
        searchByTitle(input)
    })

    const handleItem = (item, key) => {
        let title =
                item.attributes.title.en == undefined
                    ? item.attributes.title.ja
                    : item.attributes.title.en,
            desc =
                item.attributes.description.en == undefined
                    ? item.attributes.description.ja
                    : item.attributes.description.en
        let coverUrl = 'https://uploads.mangadex.org/covers/' + item.id + '/'

        for (const relationship of item.relationships) {
            if (relationship.type == 'cover_art') {
                coverUrl += relationship.attributes.fileName
                break
            }
        }

        return <Manga title={title} desc={desc} coverUrl={coverUrl} key={key} />
    }

    if (items.length < 2) {
        return (
            <div className="search-params" key="1">
                <form action="">
                    <input
                        placeholder="manga name"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        id="name"
                        type="text"
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            searchByTitle(input).then((data) => {
                                setItems(data)
                            })
                        }}
                        className="button"
                    >
                        submit
                    </button>
                </form>
            </div>
        )
    } else {
        return (
            <div className="mangaresults" key="2">
                {items.length > 1 &&
                    items.map((item, i) => handleItem(item, i))}
            </div>
        )
    }
}
