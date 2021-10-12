import React from "react";
import { Line } from "react-chartjs-2";
import { red } from "@mui/material/colors";

export default function HourlyGraph({ xdata, tempData, humidData, text }) {
  return (
    <div>
      <Line
        data={{
          labels: xdata,
          datasets: [
            {
              label: "Temperature",
              data: tempData,
              borderColor: red,
              backgroundColor: red,
              yAxisID: "y",
            },
            {
              label: "Humidity",
              data: humidData,
              yAxisID: "y1",
            },
          ],
        }}
        height={400}
        width={400}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: true,
            title: {
              display: true,
              text: text,
            },
          },
          animations: {
            radius: {
              duration: 400,
              easing: "linear",
              loop: (context) => context.active,
            },
          },
          hoverRadius: 20,
          interaction: {
            mode: "nearest",
            intersect: false,
            axis: "x",
          },
          scales: {
            y: {
              display: true,
              title: {
                display: true,
                text: "Temperature (\xB0C)",
              },
            },
            y1: {
              display: true,
              position: "right",
              title: {
                display: true,
                text: "Humidity (%)",
              },
            },
          },
        }}
      />
    </div>
  );
}
