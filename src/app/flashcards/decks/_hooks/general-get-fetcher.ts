export const generalGetFetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`An error occurred while fetching the data. Url: ${url}`)
    }
    return res.json()
}
