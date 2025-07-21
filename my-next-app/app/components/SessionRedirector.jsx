// components/SessionRedirector.jsx

'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionRedirector() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.isNewUser) {
      router.push("/complete-profile");
    }
  }, [status, session, router]);

  return null;
}
