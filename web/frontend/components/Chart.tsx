import React, { createElement, useMemo, useState } from 'react';
import { SkeletonDisplayText, Spinner } from '@shopify/polaris';
import { ColumnChart, LineChart } from 'react-chartkick';
import 'chartkick/chart.js';
//import ChartTypeToggle from '@components/ChartTypeToggle/index';
import randomHash from '../helpers/randomHash';
import { format } from 'date-fns';

// import Loader from '@components/Loader';

interface ChartProps {
    loading: boolean;
    switcher: boolean;
    title: string;
    dataSet: [string, number | string];
    colors?: any;
    type: 'column' | 'line' | 'pie';
}

const chart = {
    line: LineChart,
    column: ColumnChart,
};

function DataSet(array) {
    this.array = [...(array || [])];
    this.line = () => this.array;
    this.column = () => this.array;
}

const Chart: React.FC<ChartProps> = ({ loading, switcher, title, dataSet, colors, type }) => {
    const [activeToggleType, setActiveToggleType] = useState(type);

    const switcherId = useMemo(() => randomHash(), []);

    const data = useMemo(() => {
        if (Array.isArray(dataSet) && dataSet.length) {
            return dataSet;
        }
        // If the data for build the chart is empty, create a dataset for the last 30 days and zero values
        const prevDay = new Date();
        const dataArray = new DataSet(
            // TODO: Implement a floating date range to display empty values in a custom date range
            Array(30)
                .fill(1)
                .map(() => {
                    const item = [format(prevDay, 'MMM, dd, yyyy'), 0];
                    prevDay.setDate(prevDay.getDate() - 1);
                    return item;
                }),
        );
        return dataArray[activeToggleType]();
    }, [dataSet, activeToggleType]);

    const typeChangeHandler = () => setActiveToggleType((currentType) => (currentType === 'line' ? 'column' : 'line'));

    return (
        <div >
            <div >
                <div >{loading ? <SkeletonDisplayText size="medium" /> : title}</div>
                {/* {switcher && (
          <div className={styles.Chart__switcher}>
            <ChartTypeToggle id={switcherId} onChange={typeChangeHandler} checked={activeToggleType === 'line'} />
          </div>
        )} */}
            </div>
            {loading ? (
                <Spinner />
            ) : (
                chart.hasOwnProperty(activeToggleType) &&
                createElement(chart[activeToggleType], {
                    data,
                    colors,
                    height: '235px',
                })
            )}
        </div>
    );
};

export default Chart;
