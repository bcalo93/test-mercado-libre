import Image from 'next/image'
import Link from 'next/link'
import Price from '../price'
import styles from './itemCard.module.scss'

export default function ItemCard({ item }) {
  const { id, address, free_shipping, picture, price, title } = item
  return (
    <div className={styles.card}>
      <img className={styles['card-picture']} src={picture} alt={title} />
      <div className={styles['card-detail']}>
        <div className={styles['card-item_additional-info']}>
          <Price amount={price.amount} currency={price.currency} />
          {free_shipping ? (
            <Image
              src="/images/ic_shipping.png"
              alt="free shipping"
              width="20"
              height="20"
              layout="fixed"
            />
          ) : (
            ''
          )}
          <span className={styles['card-item_location']}>{address.state}</span>
        </div>
        <div className={styles['card-item_title']}>
          <Link href={`/items/${id}`}>
            <a>{title}</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
