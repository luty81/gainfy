import { parseISO, format } from 'date-fns'

export default function Date({ children }) {
    const date = parseISO(children)
    return <time dateTime={children}>
        {format(date, 'LLLL d, yyyy')}
    </time>
}