import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostsOrderedByDate() {

    const allPostsIds = await getAllPostsIds()
    const allPosts = allPostsIds.map(p => getPostData(p.params.id))
    return allPosts.sort((x, y) => x.date < y.date ? 1 : -1)
}

export function getPostData(id) {
    const md = markdown(id)
    
    return { 
        id,
        ...md.data
    }
}

export async function getPostDataAsync(id) {
    const md = markdown(id)
    const htmlContent = (await Html().process(md.content)).toString()
    return {
        id,
        htmlContent,
        ...md.data
    }
}

function Html() {
    return remark().use(html)
}

function markdown(mdPageId) {
    const fullPath = path.join(postsDirectory, `${mdPageId}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    return matter(fileContents)
}

export async function getAllPostsIds() {

    const res = await fetch("https://run.mocky.io/v3/64ea86cb-7c38-4d2e-9a30-255df4d13062")
    const allPosts = await res.json()
    
    return allPosts.map(post => {
        return {
            params: {
                id: post.id
            }
        }
    })
}
        