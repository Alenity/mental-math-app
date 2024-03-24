export default function Card({children} : Readonly<{children: React.ReactNode}>) {
  return(
    <div className="bg-secondary-bg-color border rounded-2xl border-transparent p-5 w-full h-full">
      {children}
    </div>
  )
}