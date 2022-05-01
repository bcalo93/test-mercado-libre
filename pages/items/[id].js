import Layout from '../../components/layout'
import { getItemById } from '../../services/itemsApi'
import styles from './itemDetail.module.scss'

export default function ItemDetail({ item }) {
  return (
    <Layout>
      <article className={styles['item-detail']}>
        <img src={item.picture} alt={item.title} />
        <div>DETAILS</div>
        <div>description</div>
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
