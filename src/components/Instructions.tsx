export const Instructions = () => {
  return (
    <fieldset>
      <legend>Instructions</legend>
      <h5>How to Use the CSV Data Visualization and Aggregation Tool</h5>
      <div>
        <p>Step 1: Upload a CSV file</p>
        <ol>
          <li>
            Click the "Choose File" button in the Upload CSV file section.
          </li>
          <li>
            Select a CSV file from your computer. The file should contain
            numerical data in a single column format.
          </li>
          <li>
            Once the file is uploaded, the data will be ready for processing.
          </li>
        </ol>
        <p>You can use one of the sample CSV files:</p>
        <ul>
          <li>
            <a href="/samples/data_points_1_000.csv">1000 Rows</a>
          </li>
          <li>
            <a href="/samples/data_points_1_000_invalid.csv">
              1000 Rows - Invalid
            </a>
          </li>
          <li>
            <a href="/samples/data_points_10_000.csv">10000 Rows</a>
          </li>
          <li>
            <a href="/samples/data_points_100_000.csv">100000 Rows</a>
          </li>
          <li>
            <a href="/samples/data_points_1_000_000.csv">1000000 Rows</a>
          </li>
        </ul>
      </div>
      <div>
        <p>Step 2: Configure Chart Settings</p>
        <ol>
          <li>
            In the Chart Settings section, customize the following options:
            <ul>
              <li>
                Number of data points (N):{" "}
                <em>
                  Specify how many data points should be displayed on the chart
                  at a time.
                </em>
              </li>
              <li>
                Starting Index (S):{" "}
                <em>
                  Define the index in the dataset where the chart will begin
                  rendering.
                </em>
              </li>
              <li>
                Time interval in milliseconds (T):{" "}
                <em>
                  Set the time (in milliseconds) between real-time updates to
                  the chart.
                </em>
              </li>
              <li>
                Number of data points to shift (P):{" "}
                <em>
                  Indicate how many data points should shift with each update.
                </em>
              </li>
            </ul>
          </li>
          <li>
            Once you've set your desired parameters, click the "Start" button to
            see chart updates based on the time interval and shift points
            specified.
          </li>
        </ol>
      </div>

      <div>
        <p>Step 3: View chart and aggregations</p>
        <ul>
          <li>
            <p>The chart will display the following:</p>
            <ul>
              <li>
                CSV Data (Downsampled): A line graph of the selected data
                points.
              </li>
              <li>
                Margin of Error Bounds: Shaded areas representing the upper and
                lower bounds for the data.
              </li>
              <li>
                The chart updates dynamically based on the time interval (T) and
                shift points (P) specified.
              </li>
            </ul>
          </li>
          <li>
            <p>
              Below the chart, you’ll find a summary of aggregation metrics
              calculated for the currently visible data points:
            </p>
            <ul>
              <li>Minimum: The lowest value in the displayed data.</li>
              <li>Maximum: The highest value in the displayed data.</li>
              <li>Average: The mean value of the displayed data.</li>
              <li>
                Variance: The measure of data spread in the displayed range.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </fieldset>
  );
};
