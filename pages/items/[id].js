import Layout from '../../components/layout'
import ItemDetail from '../../components/itemDetail'
import { getItemById } from '../../services/itemsApi'
import styles from './itemPage.module.scss'

export default function ItemPage({ item }) {
  return (
    <Layout
      breadcrumbs={item.categories}
      pageTitle={`${item.title} | MercadoLibre`}
      pageDescription={`Compra tus ${item.title}  hoy`}
    >
      <article className={styles['item']}>
        <img
          className={styles['item-picture']}
          src={item.picture}
          alt={item.title}
        />

        <div className={styles['item-detail']}>
          <ItemDetail
            condition={item.condition}
            soldQuantity={item.sold_quantity}
            price={item.price}
            title={item.title}
          />
        </div>
        <section className={styles['item-description']}>
          <h2>Descripción del producto</h2>
          <p>{item.description}</p>
        </section>
      </article>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=30, stale-while-revalidate=59'
  )

  const { item } = await getItemById(context.params.id)
  return {
    props: { item },
  }
}
