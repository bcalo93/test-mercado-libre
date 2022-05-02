import Price from '../price'
import styles from './itemDetail.module.scss'

const DEFAULT_CONDITION = 'Sin especificar'
const CONDITION_TO_LABEL = {
  not_specified: DEFAULT_CONDITION,
  used: 'Usado',
  new: 'Nuevo',
}

const normalizeCondition = (condition) =>
  CONDITION_TO_LABEL[condition] || DEFAULT_CONDITION

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
