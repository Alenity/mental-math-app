import { DataProps } from "@/lib/custom-types";
import Card from "@/ui/card";
import Divider from "./divider";
import { Radar, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, PointElement, RadialLinearScale, LinearScale, CategoryScale, Tooltip } from "chart.js";

ChartJS.register(BarElement, LineElement, PointElement, RadialLinearScale, LinearScale, CategoryScale, Tooltip);
ChartJS.defaults.color = '#4d4d4d'
ChartJS.defaults.borderColor = '#4d4d4d'
ChartJS.defaults.backgroundColor = '#4d4d4d'

export default function ResultPage({data} : {data: DataProps}) {
  function mean(array: number[]) {
    let avg: number = 0;
    array.forEach((e) => avg += e);
    avg /= array.length;
    return Math.round(avg);
  }
  const lineData = {
    labels: [...data.questionHistory.map((v, index) => index + 1)],
    datasets: [{
      data: [...data.timePerQuestion],
      borderColor: '#007acc',
      tension: .2
    }],
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: 'Time Taken Per Question (ms)'
          }
        }
      }
    }
  }
  
  return (
    <div className="w-full h-full grid grid-rows-3 grid-cols-4 gap-10 p-5">
      <div className="h-full col-span-1 row-span-3 col-start-1 row-start-1 flex flex-col space-y-10"> 
        <div className="aspect-square shrink-0 flex-1">
          <Card>
            <p className="text-hover-color">Summary</p>
          </Card>
        </div>
        <div className="h-1/3 flex-1">
          <Card classNames="flex flex-col">
            <p className="text-hover-color pb-5">Question History</p>
            <Divider horizontal={true}/>
            <ol className="overflow-y-auto pt-5">
              {data.questionHistory.map((q, index) => {
                return <li className="text-text-color text-2xl" key={index}>{index+1}) {q}</li>;
              })}
            </ol>
          </Card>
        </div>
      </div>
      <div className="col-start-2 row-start-1 col-span-3 row-span-2">
        <Card classNames="flex flex-col">
          <p className="text-hover-color flex-1 ">Avg Time Per Question: {mean(data.timePerQuestion)}ms</p>
          <div className="flex-1">  
            <Line data={lineData}/>
          </div>
        </Card>
      </div>
      <div className="col-start-2 row-start-3 col-span-3 row-span-1">
        <Card>
          <p className="text-hover-color">Action Buttons</p>
        </Card>
      </div>
    </div>
  );
}