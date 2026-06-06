export const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        const info = await res.json()
        const status = res.status
        throw new Error(`An error occurred while fetching the data. Url: ${url}; Message: ${info}; Status: ${status}`)
    }
    return res.json()
}
