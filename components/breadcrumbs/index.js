import styles from './breadcrumbs.module.scss'

export default function Breadcrumbs({ breadcrumbs, separator = '>' }) {
  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((crumb, index) => {
        const isLast = breadcrumbs.length - 1 === index
        return isLast ? (
          <span className={styles['breadrcumb-item']} key={crumb}>
            {crumb}
          </span>
        ) : (
          <>
            <span className={styles['breadrcumb-item']} key={crumb}>
              {crumb}
            </span>
            <span key={crumb}>{separator}</span>
          </>
        )
      })}
    </div>
  )
}
