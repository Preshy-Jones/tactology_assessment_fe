"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/departments");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="">
      <h1>Welcome to tactology</h1>
    </div>
  );
}
