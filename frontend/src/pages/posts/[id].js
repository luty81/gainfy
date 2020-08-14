import { getSortedPostsData, getAllPostsIds } from "../../lib/posts";
import Layout from "../../components/layout";
import Head from 'next/head' 
import Date from '../../components/date'

export default function Post({ postData }) {

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <br/>

            <h4>{postData.title}</h4> 
            
            <Date children={postData.date} />
            

            <br/><br/>
            <div dangerouslySetInnerHTML={{ __html: postData.htmlContent}} /> 
        </Layout>
    )
}

export  async function getStaticPaths() {
    const paths = getAllPostsIds()
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

    const postData = await getSortedPostsData(params.id)

    return { props: { postData } }
}
