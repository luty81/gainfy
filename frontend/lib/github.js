import get from 'swr'

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export function github (user) {
    return get(`https://api.github.com/users/${user}/repos`, fetcher)
}