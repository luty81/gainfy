import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(), 'posts')

export async function getSortedPostsData(id) {

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const matterResult = matter(fileContents)

    const htmlContent = 
        (await remark()
            .use(html)
            .process(matterResult.content))
        .toString()

    return { 
        id,
        htmlContent, 
        ...matterResult.data
    }
    // return allPostsData.sort((a, b) => {
    //     return a.date < b.date ? 1 : -1
    // })
}

export function getAllPostsIds() {
    const filenames = fs.readdirSync(postsDirectory)
    return filenames.map(fileName => { 
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}