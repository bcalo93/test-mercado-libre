import Layout from '../../components/layout'
import ItemDetail from '../../components/itemDetail'
import { getItemById } from '../../services/itemsApi'
import styles from './itemPage.module.scss'

export default function ItemPage({ item }) {
  return (
    <Layout>
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
  const { item } = await getItemById(context.params.id)
  return {
    props: { item },
  }
}
