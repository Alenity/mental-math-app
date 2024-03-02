import QBoard from '@/ui/q-board';

export default function Home() {
 
  return (
    <main className="w-screen h-screen bg-main-bg-color flex flex-col p-5">
      <div className="w-full h-full flex justify-between flex-1">
        <div>
          <p className="font-mono text-hover-color">Sail Math</p>
        </div>
        <div>
          <p className="font-mono text-text-color">Account Stuff</p>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-4">
        <QBoard/>
      </div>
      <div className="w-full h-full flex justify-between flex-1">
        <div>
          <p className="font-mono text-text-color">v0.0.1</p>
        </div>
      </div>
    </main>
  );
}