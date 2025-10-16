"use client";

import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

export default function Page() {
  console.log("db", process.env.NODE_ENV!);
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">tick sol</h1>
        <Button size="sm" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button size="sm" onClick={() => router.push("/signup")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
