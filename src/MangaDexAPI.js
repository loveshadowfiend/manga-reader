import axios from 'axios'

const baseUrl = 'https://api.mangadex.org'

export const searchByTitle = async (title) => {
    const resp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga`,
        params: {
            title: title,
            includes: ['cover_art']
        }
    })

    return resp.data.data
}