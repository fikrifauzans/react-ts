import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';

// Proses data untuk chart
const processData = (data: any[]) => {
  const departmentCounts = data.reduce((acc: any, curr: any) => {
    acc[curr.department] = (acc[curr.department] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(departmentCounts).map((department) => ({
    name: department,
    value: departmentCounts[department]
  }));
};

const EmployeeDistributionChart = ({ data = [] }) => {
  const chartData = processData(data);
  const series = chartData.map((item) => item.value);
  const labels = chartData.map((item) => item.name);

  const options: ApexOptions = {
    chart: {
      type: 'pie' // Ensure the type is correctly typed
    },
    labels,
    responsive: [
      {
        breakpoint: 0,
        options: {
          chart: {
            width: 0
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <Grid xs={12} sm={6} md={6} item>
      <Card
        sx={{
          px: 1
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Grouping Department Employee
          </Typography>
          <div style={{ width: '100%', height: 'auto' }}>
            <ApexCharts
              options={options}
              series={series}
              type="pie"
              width="100%"
              height={'auto'}
            />
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EmployeeDistributionChart;
