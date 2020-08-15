import Head from 'next/head' 

import { getAllPostsIds, getPostDataAsync } from "../../lib/posts";
import Layout from "../../components/layout";
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
export async function getStaticProps({ params }) {
    const postData = await getPostDataAsync(params.id)
    return { props: { postData } }
}

export async function getStaticPaths() {
    const paths = await getAllPostsIds()
    return { paths, fallback: false }
}