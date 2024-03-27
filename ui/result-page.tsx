import { DataProps } from "@/lib/custom-types";
import Card from "@/ui/card";
import Divider from "./divider";
import Next from "@/assets/chevron-right.svg";
import Redo from "@/assets/redo.svg";
import { Radar, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, LineElement, PointElement, RadialLinearScale, LinearScale, CategoryScale, Tooltip } from "chart.js";

ChartJS.register(BarElement, LineElement, PointElement, RadialLinearScale, LinearScale, CategoryScale, Tooltip);
ChartJS.defaults.color = '#4d4d4d'
ChartJS.defaults.borderColor = '#4d4d4d'
ChartJS.defaults.backgroundColor = '#4d4d4d'

export default function ResultPage({data, restart} : {data: DataProps, restart: any}) {
  function mean(array: number[]) {
    let avg: number = 0;
    array.forEach((e) => avg += e);
    avg /= array.length;
    return Math.round(avg);
  }
  const lineData = {
    labels: [...data.questionHistory.map((v, index) => "Q" + (index + 1))],
    datasets: [{
      data: [...data.timePerQuestion],
      borderColor: '#007acc',
      tension: .2
    }],
  }
  
  return (
    <div className="w-full h-full grid grid-rows-3 grid-cols-4 gap-10 p-5">
      <div className="h-full col-span-1 row-span-3 col-start-1 row-start-1 flex flex-col space-y-10"> 
        <div className="flex-1 h-1/2">
          <Card classNames="flex flex-col justify-evenly">
              <div className="flex flex-col items-center justify-center">
                <p className="text-hover-color ">Avg Time Per Question:</p>
                <p className="text-accent-color text-7xl">{mean(data.timePerQuestion)}ms</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-hover-color">Accuracy:</p>
                <p className="text-accent-color text-7xl">{((data.questionsCorrect/data.questionHistory.length)*100).toPrecision(3)}%</p>
              </div>
          </Card>
        </div>
        <div className="flex-1 h-1/2">
          <Card classNames="flex flex-col">
            <p className="text-hover-color  pb-5">Question History</p>
            <Divider horizontal={true}/>
            <div className="flex-1 overflow-scroll">
              <ol className="pt-5">
                {data.questionHistory.map((q, index) => {
                  return <li className="text-text-color text-2xl" key={index}>{index+1}) {q}</li>;
                })}
              </ol>
            </div>
          </Card>
        </div>
      </div>
      <div className="col-start-2 row-start-1 col-span-3 row-span-2">
        <Card classNames="flex justify-center items-center">
          <div className="w-5/6 h-5/6">  
            <Line data={lineData}/>
          </div>
        </Card>
      </div>
      <div className="col-start-2 row-start-3 col-span-3 row-span-1">
        <Card classNames="flex justify-around items-center">
          <button className="fill-hover-color" onClick={() => restart(true)}>
            <Next/>
          </button>
          <button className="stroke-hover-color" onClick={() => null}>
          <Redo/>
          </button>
        </Card>
      </div>
    </div>
  );
}