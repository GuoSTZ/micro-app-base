import React, { useRef, useEffect } from 'react';
import Charts, {ChartsRefInstance} from '@/components/Charts';
import './index.less';

export default () => {
  const option: any = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  const ref = useRef<ChartsRefInstance>();
  // useEffect(() => {
  //   fetch('https://github.com/users/GuoSTZ/contributions?from=2021-12-01&to=2021-12-31', {
  //     mode: "no-cors",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "text/html"
  //     }
  //   })
  //     .then((res: Response) => {
  //       console.log(res, res.formData, '====res')
  //       // return res.json()
  //       return res;
  //     })
  //     .then(data => {
  //       console.log(data, '=====data')
  //     })
  // }, [])
  return (
    <div>
      <Charts 
        id="git"
        ref={ref}
        option={option} 
        style={{
          width: '50%',
          height: 400,
        }}
      />
    </div>
  )
}