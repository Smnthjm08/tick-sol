"use client";

import { authClient } from "@workspace/common/auth-client";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Logged out successfully")
        },
      },
    });
  };

  return (
    <div>

    <Button
      onClick={handleLogout}
      //   variant={"destructive"}
      className="cursor-pointer bg-red-600 text-white hover:bg-red-500"
      >
      Logout
    </Button>
      </div>
  );
}
