import Head from 'next/head'
import Link from 'next/link'
import { Table, Header, Container, Divider } from 'semantic-ui-react'

import { github } from '../lib/github.js'
import { getPostsOrderedByDate } from '../lib/posts'
import Layout from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'

export async function getStaticProps() {
  const posts = await getPostsOrderedByDate()
  
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

      </Layout>
  )
}