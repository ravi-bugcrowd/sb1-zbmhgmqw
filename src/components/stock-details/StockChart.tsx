import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { Stock } from '../../types';

interface StockChartProps {
  stock: Stock;
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
}

const StockChart: React.FC<StockChartProps> = ({ stock, data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: 400
        });
      }
    };

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#D1D5DB',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: '#6B7280',
          style: 3,
        },
        horzLine: {
          width: 1,
          color: '#6B7280',
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: '#374151',
      },
      timeScale: {
        borderColor: '#374151',
        timeVisible: true,
        secondsVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: '#10B981',
      downColor: '#EF4444',
      borderUpColor: '#10B981',
      borderDownColor: '#EF4444',
      wickUpColor: '#10B981',
      wickDownColor: '#EF4444',
    });

    const volumeSeries = chartRef.current.addHistogramSeries({
      color: '#6B7280',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    candlestickSeries.setData(data);
    volumeSeries.setData(data.map(item => ({
      time: item.time,
      value: item.volume,
      color: item.close > item.open ? '#10B981' : '#EF4444',
    })));

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{stock.symbol} Price Chart</h3>
          <p className="text-sm text-gray-400">{stock.name}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700">1D</button>
          <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700">1W</button>
          <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700">1M</button>
          <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded hover:bg-gray-700">1Y</button>
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};

export default StockChart;