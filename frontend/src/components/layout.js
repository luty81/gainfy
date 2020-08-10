import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Head from 'next/head'
import Link from 'next/link'

const name = "Gainfy"
export const siteTitle = "Gainfy"

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content="Monitor your investments. Track your wealth growth!" />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_card"/>
            </Head>
            <header className={styles.header} >
                {home ? (
                    <>
                        <img 
                            src="/images/bag_money.png"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name} 
                        />
                        <h1 className={utilStyles.heading2x1}>{name}</h1>
                    </>
                ) : (
                    <>
                    <Link href="/">
                      <a>
                        <img
                          src="/images/bag_money.png"
                          className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                          alt={name}
                        />
                      </a>
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                      <Link href="/">
                        <a className={utilStyles.colorInherit}>{name}</a>
                      </Link>
                    </h2>
                  </>
                )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back</a>
                    </Link>
                </div>
            )}
        </div>
    )
}