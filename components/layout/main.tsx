import { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MainProps {
  children: ReactNode
  className?: string
}

const Main: FC<MainProps> = ({ children, className = "" }) => {
  return (
    <>
      <div
        className={cn(
          "relative isolate mx-auto max-w-5xl",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export default Main
