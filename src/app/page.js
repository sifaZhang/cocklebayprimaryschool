import Image from 'next/image'
import styles from './page.module.css'

export default function Page() {
  return (
    <div className='home'>
      <h1 className='home-block-big'>
        A Happy Place 
      </h1>
      <p className='home-block-small'>
        Quality teaching and learning
        <br></br>
        within a caring environment
      </p>
    </div>
  )
}