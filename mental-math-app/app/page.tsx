

export default function Home() {
  return (
    <main className="w-screen h-screen bg-main-bg-color flex flex-col p-5">
      <div className="w-full h-full flex justify-between flex-1">
        <div>
          <p className="font-mono">Sail Math</p>
        </div>
        <div>
          <p className="font-mono">Account Stuff</p>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-4">
        <div className="w-2/3  h-2/3 flex flex-col justify-around items-center p-5">
          <p className="text-8xl font-mono">Question</p>
          <div className="w-full border-secondary-bg-color border-8 rounded-lg h-20">
            {/* <label  className="">Answer...</label> */}
            <input id="Answer" className="w-full h-full bg-main-bg-color text-ellipsis"></input>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex justify-between flex-1">
        <div>
          <p className="font-mono">v0.0.1</p>
        </div>
      </div>
    </main>
  );
}