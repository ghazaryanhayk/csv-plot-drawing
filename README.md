# Simple Plot Drawing application

Application creates a simple plot drawing based on the data provided in CSV format.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Instructions](#instructions)

## Tech Stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PapaParse](https://www.papaparse.com/)
- [Chart.js](https://www.chartjs.org/)

## Installation

To install application

```bash
npm install
```

## Usage

To run the application

```bash
npm run dev
```

To run tests

```bash
npm run test
```

## Instructions

### How to Use the CSV Data Visualization and Aggregation Tool

#### Step 1: Upload a CSV file

1. Click the "Choose File" button in the Upload CSV file section.
2. Select a CSV file from your computer. The file should contain numerical data in a single column format.
3. Once the file is uploaded, the data will be ready for processing.

You can use one of the sample CSV files:

- [1000 Rows](public/samples/data_points_1_000.csv)
- [1000 Rows - Invalid data](public/samples/data_points_1_000_invalid.csv)
- [10000 Rows](public/samples/data_points_10_000.csv)
- [100000 Rows](public/samples/data_points_100_000.csv)
- [1000000 Rows](public/samples/data_points_1_000_000.csv)

#### Step 2: Configure Chart Settings

1. In the Chart Settings section, customize the following options:
   - **Number of data points (N):** _Specify how many data points should be displayed on the chart at a time._
   - **Starting Index (S):** _Define the index in the dataset where the chart will begin rendering._
   - **Time interval in milliseconds (T):** _Set the time (in milliseconds) between real-time updates to the chart._
   - **Number of data points to shift (P):** _Indicate how many data points should shift with each update._
2. Once you've set your desired parameters, click the "Start" button to see chart updates based on the time interval and shift points specified.

#### Step 3: View chart and aggregations

- The chart will display the following:
  - **CSV Data (Downsampled):** A line graph of the selected data points.
  - **Margin of Error Bounds:** Shaded areas representing the upper and lower bounds for the data.
  - The chart updates dynamically based on the time interval (T) and shift points (P) specified.
- Below the chart, you’ll find a summary of aggregation metrics calculated for the currently visible data points:
  - **Minimum:** The lowest value in the displayed data.
  - **Maximum:** The highest value in the displayed data.
  - **Average:** The mean value of the displayed data.
  - **Variance:** The measure of data spread in the displayed range.
