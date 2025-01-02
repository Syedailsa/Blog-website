import {
    Github,
    Linkedin,
  } from "@/components/icons";
  import Link from "next/link";
  
  export default function SocialMedia() {
    return (
  
      // Social Icons
      <nav className="flex gap-2 ">
        <Link href={"www.linkedin.com/in/ilsa-ubaid-nextjs-developer"} target="_blank">
          <Linkedin className={`w-6 h-6`} />
        </Link>
        <Link href={"https://github.com/Syedailsa"} target="_blank">
          <Github className={`w-6 h-6 fill-dark dark:fill-light`} />
        </Link>
      </nav>
    );
  }