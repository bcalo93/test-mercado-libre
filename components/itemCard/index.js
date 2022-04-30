import Image from 'next/image'
import Link from 'next/link'
import Price from '../price'
import styles from './itemCard.module.scss'

export default function ItemCard({ item }) {
  const { id, address, free_shipping, picture, price, title } = item
  return (
    <div className={styles.card}>
      <img src={picture} alt={title} />
      <div className={styles['card-detail']}>
        <div className={styles['card-item_price']}>
          <Price amount={price.amount} currency={price.currency} />
          {free_shipping ? (
            <Image src="/images/ic_shipping.png" width="15" height="15" />
          ) : (
            ''
          )}
        </div>
        <Link href={`/items/${id}`}>
          <a>{title}</a>
        </Link>
      </div>
      <span className={styles['card-item_location']}> {address.state}</span>
    </div>
  )
}
