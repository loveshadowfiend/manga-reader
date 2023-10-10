export const Manga = (props) => {
    return (
        <div className="manga">
            <div className="mangaCover">
                <img
                    // src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/220px-Original_Doge_meme.jpg"
                    src={props.coverUrl}
                    alt="manga cover"
                ></img>
            </div>
            <div className="mangaDetails">
                <h1>{props.title}</h1>
                <p>{props.desc}</p>
            </div>
        </div>
    )
}
