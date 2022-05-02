import Head from 'next/head'
import Header from '../header'
import styles from './layout.module.scss'
import Breadcrumbs from '../breadcrumbs'

export default function Layout({
  children,
  pageTitle = 'Mercado Libre',
  pageDescription = 'Encontrá aquel producto que estas buscando.',
  breadcrumbs,
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Header />
      <main className={styles.main}>
        {children ? (
          <div className={styles.container}>
            {breadcrumbs ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : ''}
            <div className={styles['content-box']}>{children}</div>
          </div>
        ) : (
          ''
        )}
      </main>
    </>
  )
}
