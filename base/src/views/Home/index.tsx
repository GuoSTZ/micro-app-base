import React, { useEffect } from 'react';
import * as actions from '@/action';
import FlipClock from '@/components/FlipClock';

export default () => {

  useEffect(() => {
    // actions.fetchData({})
  }, [])

  return (
    <div>
      <FlipClock />
    </div>
  )
}