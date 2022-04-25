import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Encontrá lo que estas buscando</title>
        <meta
          name="description"
          content="Encontrá aquel producto que estas buscando."
        />
      </Head>
      <Layout>
        <Link href="/items">Click Me</Link>
      </Layout>
    </>
  )
}
