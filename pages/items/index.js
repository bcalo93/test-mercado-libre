import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/layout'
import { searchItems } from '../../services/itemsApi'
import ItemCard from '../../components/itemCard'
import styles from './items.module.scss'

export default function ItemsPage() {
  const [data, setData] = useState()
  const router = useRouter()

  useEffect(() => {
    const { search } = router.query
    if (!router.isReady || !search) {
      return
    }
    searchItems(search).then(setData)
  }, [router.isReady, router.query.search])

  return (
    <Layout breadcrumbs={data?.categories}>
      {data?.items ? (
        <div className={styles['items-list']}>
          {data.items?.map((item) => (
            <div key={item.id}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </Layout>
  )
}
