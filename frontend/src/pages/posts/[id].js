import { getSortedPostsData, getAllPostsIds } from "../../lib/posts";
import Layout from "../../components/layout";

export default function Post({ postData }) {

    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br/>
            {postData.postData}
            <br/>
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
