import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <>
      <Link href="/" className={cn("group mr-4 flex items-center", className)}>
        <div className="group flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20 dark:bg-gradient-to-t dark:from-slate-700 dark:via-slate-700 dark:to-slate-800 dark:text-slate-500 dark:ring-white/10 dark:hover:bg-gradient-to-br dark:hover:from-slate-800 dark:hover:via-slate-700 dark:hover:to-slate-600 dark:active:ring-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-yellow-500"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <title>sign-language</title>
            <g fill="currentColor">
              <path d="M13,33.376v-11.4L9.127,11.336A2.075,2.075,0,0,0,6.852,9.951,2,2,0,0,0,5.332,12.6l5.049,13.874a.5.5,0,0,1-.708.61L4.766,24.429a2.5,2.5,0,0,0-2.848,4.082l12.39,10.568A13.518,13.518,0,0,1,13,33.376Z"></path>
              <path d="M18.1,12.6a4.241,4.241,0,0,1,3.256,3.089l.034.126.347,2.793,1.7-3.029L19.377,4.413A2.074,2.074,0,0,0,17.1,3.028a2,2,0,0,0-1.52,2.653Z"></path>
              <path d="M24.732,13.277,27.305,8.7a2,2,0,0,0-2.8-.918,2.075,2.075,0,0,0-.852,2.524Z"></path>
              <path d="M13.056,16.284A4.367,4.367,0,0,1,16.008,12.7L13.4,5.525A2.074,2.074,0,0,0,11.122,4.14,2,2,0,0,0,9.6,6.793Z"></path>
              <path
                d="M45.591,20.618a2.153,2.153,0,0,0-2.6.938l-4.406,7.717a1,1,0,0,1-1.737-.992l7.881-13.8a2.074,2.074,0,0,0-.414-2.631,2,2,0,0,0-3.006.554L33.373,26.3a1,1,0,1,1-1.737-.992l8.378-14.67A2.074,2.074,0,0,0,39.6,8a2,2,0,0,0-3.007.555l-8.43,14.763a1,1,0,0,1-1.737-.992l6.394-11.2A2.074,2.074,0,0,0,32.406,8.5a2,2,0,0,0-3.007.555l-8.151,14.5a.5.5,0,0,1-.932-.184l-.9-7.185a2.245,2.245,0,0,0-2.365-1.678A2.343,2.343,0,0,0,15,16.885v16.48a11.486,11.486,0,0,0,5.788,9.929,12.258,12.258,0,0,0,16.806-4.223L46.52,23.44A2,2,0,0,0,45.591,20.618Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
      </Link>
    </>
  );
};
export default Logo;
