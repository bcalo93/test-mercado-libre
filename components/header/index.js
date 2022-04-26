import Image from 'next/image'
import Link from 'next/link'
import SearchBox from '../searchBox'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles['header-content-wrapper']}>
        <Link href="/">
          <a>
            <Image
              className={styles['header-logo']}
              src="/images/Logo_ML.png"
              width="48"
              height="34"
              alt="logo"
            />
          </a>
        </Link>
        <SearchBox
          className={styles['header-search-box']}
          placeholder="Nunca dejes de buscar"
        />
      </div>
    </header>
  )
}
