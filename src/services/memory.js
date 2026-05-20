import fs from 'fs/promises'

const FILE_PATH = './data/writing-history.json'

export async function loadHistory() {

    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8')
        return JSON.parse(data)

    } catch {
        return []
    }
}

export async function saveEntry(entry) {

    const history = await loadHistory()

    history.push(entry)

    await fs.writeFile(
        FILE_PATH,
        JSON.stringify(history, null, 2)
    )
}