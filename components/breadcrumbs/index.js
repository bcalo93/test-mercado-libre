import styles from './breadcrumbs.module.scss'

function Crumb({ crumb, separator, isLast }) {
  return (
    <>
      <span className={styles['breadrcumb-item']}>{crumb}</span>
      {!isLast ? <span>{separator}</span> : ''}
    </>
  )
}

export default function Breadcrumbs({ breadcrumbs, separator = '>' }) {
  console.log(breadcrumbs)
  return (
    <div className={styles.breadcrumbs}>
      {breadcrumbs.map((crumb, index) => (
        <Crumb
          key={crumb}
          crumb={crumb}
          separator={separator}
          isLast={breadcrumbs.length - 1 === index}
        />
      ))}
    </div>
  )
}
