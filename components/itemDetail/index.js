import Price from '../price'
import styles from './itemDetail.module.scss'

const normalizeCondition = (condition) =>
  condition === 'new' ? 'Nuevo' : 'Usado'

export default function ItemDetail({ condition, soldQuantity, title, price }) {
  const { amount, currency } = price
  return (
    <div className={styles['item-detail']}>
      <span>
        {normalizeCondition(condition)} - {soldQuantity} vendidos
      </span>
      <h1 className={styles['item-detail_title']}>{title}</h1>
      <Price
        className={styles['item-detail_price']}
        amount={amount}
        currency={currency}
      />
    </div>
  )
}
