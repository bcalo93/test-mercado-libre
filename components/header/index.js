import SearchBox from '../searchBox'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <SearchBox placeholder="Nunca dejes de buscar" />
    </header>
  )
}
