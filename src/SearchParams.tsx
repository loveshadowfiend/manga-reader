import { useEffect, useState } from 'react'
import { searchByTitle } from './MangaDexAPI'
import { MangaCard } from './Manga'
import { TailSpin } from 'react-loading-icons'

export const SearchParams = () => {
    type Languages = {
        ja: string,
        ru: string,
        en: string,
    }
    
    type Manga = {
        id: string,
        attributes: {
            title: Languages,
            description: Languages,
        },
        relationships: [{
            type: string,
            attributes: {
                fileName: string
            }
        }]
    }

    const [input, setInput] = useState('')
    const [submitted, setSubmitted] = useState('')
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (submitted.length > 0) {
            setLoading(true)
            searchByTitle(submitted).then((data) => {
                setItems(data)
                setLoading(false)
            })
        }
    }, [submitted])

    const handleItem = (item: Manga, key: number) => {
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

        return <MangaCard title={title} desc={desc} coverUrl={coverUrl} key={key} />
    }

    return [
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
                        setSubmitted(input)
                    }}
                    className="button"
                >
                    submit
                </button>
            </form>
        </div>,
        <div className="mangaresults" key="2">
            {loading && <TailSpin />}
            {items.length > 2 &&
                submitted != '' &&
                !loading &&
                items.map((item, i) => handleItem(item, i))}
        </div>,
    ]
}
