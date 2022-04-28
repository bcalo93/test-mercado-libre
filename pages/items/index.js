import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { searchItems } from '../../services/itemsApi'
import ItemCard from '../../components/itemCard'
import styles from './items.module.scss'

export default function ItemsPage() {
  const [items, setItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const { search } = router.query
    if (!router.isReady || !search) {
      return
    }
    searchItems(search).then((data) => setItems(data.items))
  }, [router.isReady, router.query.search])

  return (
    <Layout>
      <div className={styles['items-list']}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  )
}
