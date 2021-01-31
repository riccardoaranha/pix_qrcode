import Link from 'next/link'

export default function Links() {
  return (
    <ul>
      <li>
        <Link href="/"><a>Home</a></Link>
      </li>
      <li>
          <Link href="/static"><a>Static</a></Link>
      </li>
    </ul>
  )
}

