import { jetbrains } from './fonts';
import QBoard from '@/ui/q-board';

export default function Home() {
  
  return (
    <main className="w-screen h-screen bg-main-bg-color flex flex-col p-5">
      <div className="w-full h-full flex justify-between flex-1">
        <div>
          <p className={`text-hover-color ${jetbrains.className}`}>Sail Math</p>
        </div>
        <div>
          <p className={`${jetbrains.className} text-text-color`}>Account Stuff</p>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-around items-center flex-4">
        <QBoard/>
      </div>
      <div className="w-full h-full flex justify-between flex-1">
        <div className="flex items-end">
          <p className={`${jetbrains.className} text-text-color`}>v1.1.0</p>
        </div>
        <div className="flex flex-col items-center space-y-4">
        
          {/*<p className={`${jetbrains.className} text-text-color`}>Press <kbd className="bg-text-color rounded-sm text-main-bg-color px-2 py-1">Ctrl</kbd> + <kbd className="bg-text-color rounded-sm text-main-bg-color px-2 py-1">,</kbd> for settings</p> */}
        </div>
        <div className="flex items-end">
          <p className={`${jetbrains.className} text-text-color`}>Social Stuff</p>
        </div>
      </div>
    </main>
  );
}