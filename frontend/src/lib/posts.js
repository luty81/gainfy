import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {

    const filenames = fs.readdirSync(postsDirectory);

    const allPostsData = filenames.map(fileName => {
        
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')
        
        const matterResult = matter(fileContents)
        return { id, ...matterResult.data }        
    })

    return allPostsData.sort((a, b) => {
        return a.date < b.date ? 1 : -1
    })
}