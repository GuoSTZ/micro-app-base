import React, {
  useLayoutEffect,
  useImperativeHandle,
  useRef,
  useEffect
} from 'react';
import * as echarts from 'echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/legend';
import { throttle, cloneDeep } from 'lodash';

export interface EchartsProps {
  id: string;
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
}

export interface ChartsRefInstance {
  setOption: (option: echarts.EChartsOption) => void;
}

export default React.forwardRef((props: EchartsProps, ref: React.Ref<ChartsRefInstance>): React.ReactElement => {
  const { id, option, style } = props;
  const instance = useRef<echarts.ECharts>();

  useImperativeHandle(ref, () => {
    return {
      setOption(opt: echarts.EChartsOption) {
        if (instance.current) {
          instance.current.setOption(opt);
        }
      },
    };
  });

  useLayoutEffect(() => {
    const element = document.getElementById(id);
    if (element && !instance.current) {
      instance.current = echarts.init(element as HTMLDivElement, undefined, {
        renderer: 'svg',
      });
      instance.current.setOption(option);
    }
  }, [id, option]);

  useEffect(() => {
    const func = throttle(() => {
      if (instance.current) {
        instance.current.resize();
      }
    }, 300);

    window.addEventListener('resize', func);

    return () => {
      window.removeEventListener('resize', func);
    };
  }, []);

  return <div id={id} style={style} />;
})
