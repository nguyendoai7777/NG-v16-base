import { EChartConfigs } from '@components/echart/echart.type';

export const LOCAL_STORAGE_KEY = {
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  historyStack: 'historyStack',
  refresh_flag: 'refresh_flag',
};

export const RequestStatus = {
  OK: 1000,
};

type MockChart = {
  [key: string]: EChartConfigs;
};
type Key = keyof typeof CHART_TEST;

export const CHART_TEST: MockChart = {
  portfolio: {
    title: {
      text: 'Accumulated Waterfall Chart',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        let tar;
        if (params[1] && params[1].value !== '-') {
          tar = params[1];
        } else {
          tar = params[2];
        }
        return (
          tar &&
          tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + 'tada'
        );
      },
    },
    legend: {
      data: ['Expenses', 'Income'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: (function () {
        let list = [];
        for (let i = 1; i <= 11; i++) {
          list.push('Nov ' + i);
        }
        return list;
      })(),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Placeholder',
        type: 'bar',
        stack: 'Total',
        silent: true,
        itemStyle: {
          borderColor: 'transparent',
          color: 'rgba(255,20,147,0.47)',
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'cyan',
          },
        },
        data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 2000],
      },
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'top',
        },
        data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-'],
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'bottom',
        },
        data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203],
      },
    ],
  },
  pieChart: {
    backgroundColor: '#FFFFFF',
    title: {
      text: '',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc',
      },
    },
    grid: {
      show: true,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },

    visualMap: [
      {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
    ],
    series: [
      {
        name: 'Web Series',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: '13 Reasons Y' },
          { value: 310, name: 'Wirl' },
          { value: 274, name: 'Sunnyzao' },
          { value: 235, name: 'Oremo' },
          { value: 400, name: 'Bolesho' },
        ].sort((a, b) => a.value - b.value),
        roseType: 'radius',
        animationType: 'expansion',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200;
        },
      },
    ],
  },
};
