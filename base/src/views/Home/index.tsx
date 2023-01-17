import React, { useEffect } from 'react';
import * as actions from '@/action';

export default () => {

  useEffect(() => {
    actions.fetchData({})
  }, [])

  return (
    <div>Home</div>
  )
}