import { login, signup } from "@/lib/actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col justify-around h-1/3 w-1/4">
      <label className="text-hover-color" htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label className="text-hover-color" htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button className="text-hover-color hover:text-accent-color" formAction={login}>Log in</button>
      <button className="text-hover-color hover:text-accent-color" formAction={signup}>Sign up</button>
    </form>
  )
}