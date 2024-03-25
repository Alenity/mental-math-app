import { DataProps } from "@/lib/custom-types";
import Card from "@/ui/card";
import Divider from "./divider";

export default function ResultPage({data} : {data: DataProps}) {
  
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
            <ol className="overflow-auto pt-5">
              {data.questionHistory.map((q, index) => {
                return <li className="text-text-color text-2xl" key={index}>{q} </li>;
              })}
            </ol>
          </Card>
        </div>
      </div>
      
      <div className="col-start-2 row-start-1 col-span-3 row-span-2">
        <Card>
          <p className="text-hover-color">Chart</p>
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