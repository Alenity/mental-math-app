'use client';
import QBoard from '@/ui/q-board';
import Login from "@/assets/login.svg";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-screen h-screen bg-main-bg-color flex flex-col p-5">
      <div className="w-full h-full flex justify-between flex-1">
        <div>
          <button onClick={() => router.push('/')}>
            <p className={`text-hover-color`}>Sail Math</p>
          </button>
        </div>
        <div className="flex flex-row items-center space-x-5 justify-center">
          <button onClick={() => router.push('/login')}>
            <Login className="w-7 h-7 stroke-text-color hover:fill-accent-color"/>
          </button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-around items-center flex-2">
       <QBoard/>
      </div>
      <div className="w-full h-full flex justify-between flex-1">
        <div className="flex items-end">
          <p className={`text-text-color`}>v1.3.0</p>
        </div>
        <div className="flex items-end">
          <p className={`text-text-color`}>Social Stuff</p>
        </div>
      </div>
    </main>
  );
}