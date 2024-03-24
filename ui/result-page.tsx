import { DataProps } from "@/lib/custom-types";
import Card from "@/ui/card";

export default function ResultPage({data} : {data: DataProps}) {
  
  return (
    <div className="w-full h-full grid grid-rows-3 grid-cols-4  gap-10 p-5">
      <div className="col-span-1 row-span-3 col-start-1 row-start-1 space-y-10 flex flex-col"> 
        <div className="aspect-square">
          <Card>
            <p>Summary</p>
          </Card>
        </div>
        <div className="grow">
          <Card>
            <p>Question History</p>
          </Card>
        </div>
      </div>
      
      <div className="col-start-2 row-start-1 col-span-3 row-span-2">
        <Card>
          <p>Chart</p>
        </Card>
      </div>
      <div className="col-start-2 row-start-3 col-span-3 row-span-1">
        <Card>
          <p>Action Buttons</p>
        </Card>
      </div>
    </div>
  );
}