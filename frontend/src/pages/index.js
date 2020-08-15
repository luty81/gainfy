import Head from 'next/head'
import Link from 'next/link'
import { Table, Header, Container, Divider } from 'semantic-ui-react'

import { github } from '../lib/github.js'
import { getPostsOrderedByDate } from '../lib/posts'
import Layout from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'

export function getStaticProps() {
  const posts = getPostsOrderedByDate()
  
  return { props: { posts } }
}

export default function Home({ posts }) {

  const { data, error } = github('luty81')
  if (!data) return "Loading..."
  if (error) return "Failed :("

  return (
    <Layout>
      <Head>
        <title>Gainfy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Divider hidden></Divider>

      <Container>
        <section className={utilStyles.headingMd}>
          <ul className={utilStyles.list}>
            {posts.map(({ id, date, title }) => (
              <li className={utilStyles.listItem}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                  <Date>{date}</Date>
                </small>
              </li>
            ))}
          </ul>
        </section>

        <Header as='h3' content='Repositories' textAlign='center' />   
        <br/>

        <section className={utilStyles.headingMd}>
          <Table celled fixed sortable>
            <Table.Header>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Full Name</Table.HeaderCell>
            </Table.Header> 

            <Table.Body>
              {data && data.map(({ id, name, full_name }) => (
                <Table.Row id={id}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{full_name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
      </Container>
  
      <footer>
        <a href="https://github.com/luty81" target="_blank" rel="noopener noreferrer">
          Developed by{' '}
        </a>
      </footer>

      <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      footer img {
        margin-left: 0.5rem;
      }

      footer a {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .title a {
        color: #0070f3;
        text-decoration: none;
      }

      .title a:hover,
      .title a:focus,
      .title a:active {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .grid {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        max-width: 800px;
        margin-top: 3rem;
      }

      .card {
        margin: 1rem;
        flex-basis: 45%;
        padding: 1.5rem;
        text-align: left;
        color: inherit;
        text-decoration: none;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        transition: color 0.15s ease, border-color 0.15s ease;
      }

      .card:hover,
      .card:focus,
      .card:active {
        color: #0070f3;
        border-color: #0070f3;
      }

      .card h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
      }

      .card p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
      }

      .logo {
        height: 1em;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
    `}</style>

      <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
    </Layout>
  )
}