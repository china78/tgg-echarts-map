import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// interface Props {
//   data?: any;
//   area?: string;
// }
const TggEchartsMap = (props) => {
  const { data, area } = props;
  const marks = [
    {
      name: "淳安县",
      value: [118.732893, 29.378202, 1],
      type: '省级验收命名类特色小镇',
      color: '#FC5C5C'
    },
    {
      name: "萧山区",
      value: [120.461488, 30.194885, 2],
      type: '省级创建类特色小镇',
      color: '#37C76A'
    },
    {
      name: "富阳区",
      value: [119.951011, 30.057148, 3],
      type: '省级培育类特色小镇',
      color: '#FF8126'
    },
  ];
  const chartRef = useRef();

  const loadMap = (name, geoJson) => {
    // 注册地图
    echarts.registerMap(name, geoJson);
    const chart = echarts.init(chartRef.current);

    // 配置
    const option = {
      // 底图
      geo: {
        map: name,
        top: 4,
        bottom: 0,
        left: 4,
        right: 0,
        itemStyle: {
          areaColor: "#929292",
          borderWidth: 1,
          borderColor: "#FFFFFF",
        },
        emphasis: {
          itemStyle: {
            areaColor: "#B13807",
          },
        },
        silent: true,
      },
      // 实图
      series: [
        {
          type: "map",
          map: name,
          top: 0,
          bottom: 12,
          left: 0,
          right: 4,
          selectedMode: false,
          itemStyle: {
            areaColor: "#F8D194",
            borderColor: "#AEAEAE",
          },
          // 文字标签
          label: {
            show: true,
            color: "#052E2D",
            fontWeight: "400",
            textBorderColor: "#ffffff",
            textBorderWidth: 4,
            fontSize: 18,
          },
          // 高亮样式
          emphasis: {
            label: {
              fontSize: 22,
            },
            itemStyle: {
              borderWidth: 1,
              borderColor: "#ffffff",
              areaColor: "#1492FF",
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowBlur: 16,
            },
          },
          // 数据
          data: [
            {
              name: "上城区",
              value: 100,
              adcode: 330102,
              itemStyle: {
                areaColor: '#A4B9DF',
              },
              label: {
                fontSize: 16,
              },
            },
            {
              name: "拱墅区",
              value: 200,
              adcode: 330105,
              itemStyle: {
                areaColor: '#FECFE2',
              },
              label: {
                fontSize: 16,
              },
            },
            {
              name: "西湖区",
              value: 300,
              adcode: 330106,
              itemStyle: {
                areaColor: '#C7E162',
              },
              label: {
                fontSize: 16,
              },
            },
            {
              name: "滨江区",
              value: 400,
              adcode: 330108,
              itemStyle: {
                areaColor: '#FFE7DD',
              },
              label: {
                fontSize: 16,
              },
            },
            {
              name: "萧山区",
              value: 500,
              adcode: 330109,
              itemStyle: {
                areaColor: '#C3E6CC',
              },
            },
            {
              name: "余杭区",
              value: 600,
              adcode: 330110,
              itemStyle: {
                areaColor: '#D0E2E9',
              },
            },
            {
              name: "富阳区",
              value: 700,
              adcode: 330111,
              itemStyle: {
                areaColor: '#EAD8E0',
              },
            },
            {
              name: "临安区",
              value: 800,
              adcode: 330112,
              itemStyle: {
                areaColor: '#8CDCE3',
              },
            },
            {
              name: "钱塘区",
              value: 900,
              adcode: 330114,
              itemStyle: {
                areaColor: '#D1DFD5',
              },
            },
            {
              name: "临平区",
              value: 1000,
              adcode: 330113,
              itemStyle: {
                areaColor: '#D0EEF1',
              },
            },
            {
              name: "桐庐县",
              value: 1100,
              adcode: 330122,
              itemStyle: {
                areaColor: '#FECED0',
              },
            },
            {
              name: "淳安县",
              value: 1200,
              adcode: 330127,
              itemStyle: {
                areaColor: '#CAC8D2',
              },
            },
            {
              name: "建德市",
              value: 1300,
              adcode: 330182,
              itemStyle: {
                areaColor: '#FFE6C4',
              },
            },
          ],
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'circle',
          legendHoverLink: true,
          symbolSize: [20, 20],
          // legendHoverLink: true,
          label: {
            show: true,
            formatter(value) {
              return value.data.value[2];
            },
            color: '#fff',
          },
          itemStyle: {
            normal: {
              shadowBlur: 1,
              shadowColor: '#fff',
              color: (val) => {
                const { color } = val.data;
                return color;
              }
            },
          },
          data: data || marks,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          hoverAnimation: true,
          zlevel: 1,
        }
      ],
    };

    chart.setOption(option);

    // 点击事件
    chart.on("click", function (params) {
      /**点击干啥 */
      console.log('点击事件: ', params);
    });
  }

  async function init() {
    const url = `/data/${area}.json`;
    const res = await import(url);
    console.log('-YYYYYY-: ', res);
    loadMap(area, res.data);
  }

  useEffect(() => {
    // const name = area;
    // const url = `/data/${area}.json`;
    // axios.get(url).then(res => {
    //   console.log('---------: ', res);
    //   loadMap(area, res.data);
    // })
    init();
  }, [props])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default TggEchartsMap;