'use client';
import { login, signup } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Account from "@/assets/account.svg";

export default function LoginPage() {
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
          <Account className="w-6 h-6 fill-text-color"/>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-around items-center flex-2">
      <form className="flex flex-col justify-around h-1/3 w-1/4">
        <label className="text-hover-color" htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label className="text-hover-color" htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button className="text-hover-color hover:text-accent-color" formAction={login}>Log in</button>
        <button className="text-hover-color hover:text-accent-color" formAction={signup}>Sign up</button>
      </form>
      </div>
      <div className="w-full h-full flex justify-between flex-1">
        <div className="flex items-end">
          <p className={`text-text-color`}>v1.3.1</p>
        </div>
        <div className="flex items-end">
          <p className={`text-text-color`}>Social Stuff</p>
        </div>
      </div>
    </main>
      
  )
}