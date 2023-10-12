import axios from 'axios'

const baseUrl = 'https://api.mangadex.org'

export const searchByTitle = async (title: string) => {
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

export const getChaptersById = async (id: string) => {
    const resp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga/${id}/feed`,
    })

    return resp.data.data
}

// searchByTitle('kimetsu').then((data) => {
//     console.log(data[0].id)
// })

getChaptersById('789642f8-ca89-4e4e-8f7b-eee4d17ea08b').then((data) => {
    console.log(data)
})