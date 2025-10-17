"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { useState, FormEvent } from "react";
import { Logo } from "../icons/logo";
import Link from "next/link";
import { authClient } from "@workspace/common/auth-client";
import { useRouter } from "next/navigation";
import { GitHubIcon, GoogleIcon } from "../icons/auth-icons";
import { handleSocialLogin } from "@/utils/auth-utils";
import {toast} from "sonner"

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          // TODO newUserCallbackURL
          router.push("/dashboard");
          toast.success("SignUp Successful");
        },
        onError: (ctx) => {
          // alert(ctx.error.message);
          toast.error(ctx.error.message || "Error signing up")
          setIsLoading(false);
        },
      },
    );

    if (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Link href="/">
        <div className="flex items-center space-x-1.5">
          <Logo
            className="h-7 w-7 text-foreground dark:text-foreground"
            aria-hidden={true}
          />
          <p className="font-medium text-lg text-foreground dark:text-foreground">
            Acme
          </p>
        </div>
      </Link>

      <h3 className="mt-4 text-lg font-semibold text-foreground dark:text-foreground">
        Create your account
      </h3>
      <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
        >
          Sign in
        </Link>
      </p>

      <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          variant="outline"
          className="flex-1 items-center justify-center space-x-2 py-2 hover:cursor-pointer"
          onClick={() => handleSocialLogin("github")}
        >
          <GitHubIcon className="size-5" aria-hidden={true} />
          <span className="text-sm font-medium">Sign up with GitHub</span>
        </Button>
        <Button
          variant="outline"
          className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0 hover:cursor-pointer"
          onClick={() => handleSocialLogin("google")}
        >
          <GoogleIcon className="size-4" aria-hidden={true} />
          <span className="text-sm font-medium">Sign up with Google</span>
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <form onSubmit={handleEmailSignup} className="mt-6 space-y-4">
        <div>
          <Label
            htmlFor="name-signup-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Full Name
          </Label>
          <Input
            type="text"
            id="name-signup-04"
            name="name"
            autoComplete="name"
            placeholder="Ephraim Blocks"
            className="mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="email-signup-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email-signup-04"
            name="email"
            autoComplete="email"
            placeholder="ephraim@blocks.so"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="password-signup-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password-signup-04"
            name="password"
            autoComplete="new-password"
            placeholder="********"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <Button
          type="submit"
          className="mt-4 w-full py-2 font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </div>
  );
}
