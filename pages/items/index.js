import { useRouter } from 'next/router'
import Layout from '../../components/layout'

export default function ItemsPage() {
  const router = useRouter()
  const { search } = router.query
  return <Layout>{search}</Layout>
}
