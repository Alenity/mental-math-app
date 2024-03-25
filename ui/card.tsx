export default function Card({children, classNames} : Readonly<{children: React.ReactNode, classNames?: string}>) {
  return(
    <div className={`bg-secondary-bg-color border rounded-2xl border-transparent p-5 w-full h-full ${classNames}`}>
      {children}
    </div>
  )
}