import Image from 'next/image'

import styles from './searchBox.module.scss'

export default function SearchBox({ searchPagePath, placeholder }) {
  return (
    <form className={styles.form}>
      <input className={styles['form-text-box']} type="text" />
      <button className={styles['form-search-button']}>
        <Image src="/images/ic_Search.png" layout="fill"></Image>
      </button>
    </form>
  )
}
