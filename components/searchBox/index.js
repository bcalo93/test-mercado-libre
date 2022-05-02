import classNames from 'classnames'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './searchBox.module.scss'

export default function SearchBox({ className, placeholder }) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const { search } = router.query

  useEffect(() => {
    if (!router.isReady || !search) {
      return
    }
    setSearchTerm(search)
  }, [router.isReady, search])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!searchTerm) {
      return
    }
    router.push(`/items?search=${searchTerm}`)
  }

  const handleTermChange = (event) => setSearchTerm(event.target.value)

  return (
    <form
      className={classNames(styles.form, className)}
      onSubmit={handleSubmit}
    >
      <input
        placeholder={placeholder}
        className={styles['form-text-box']}
        type="text"
        value={searchTerm}
        onChange={handleTermChange}
      />
      <button type="submit" className={styles['form-search-button']}>
        <Image
          src="/images/ic_Search.png"
          alt="search button"
          width="16"
          height="16"
        />
      </button>
    </form>
  )
}
