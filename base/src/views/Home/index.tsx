import React, { useEffect } from 'react';
import FlipClock from '@/components/FlipClock';
import styles from './index.module.less';

export default () => {

  useEffect(() => {
  }, [])

  return (
    <div className={styles.Home}>
      <FlipClock />
    </div>
  )
}