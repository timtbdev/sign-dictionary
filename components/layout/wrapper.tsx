import { FC, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface WrapperProps {
  children: ReactNode
  className?: string
}

const Wrapper: FC<WrapperProps> = ({ children, className = "" }) => {
  return (
    <>
      <div
        className={cn(
          "min-h-full bg-white font-sans antialiased selection:bg-blue-500/10 selection:text-blue-500",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}

export default Wrapper
