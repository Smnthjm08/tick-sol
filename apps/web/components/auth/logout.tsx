"use client";

import { authClient } from "@workspace/common/auth-client";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <Button
      onClick={handleLogout}
      //   variant={"destructive"}
      className="cursor-pointer bg-red-600 text-white hover:bg-red-500"
    >
      Logout
    </Button>
  );
}
