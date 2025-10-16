"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Logo } from "../logo";
import Link from "next/link";
import { GitHubIcon, GoogleIcon } from "../icons/auth-icons";
import { authClient } from "@workspace/common/auth-client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { handleSocialLogin } from "@/utils/auth-utils";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
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
      <Link href="/" className="">
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
      <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
        Sign in to your account
      </h3>
      <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
        >
          Sign up
        </Link>
      </p>
      <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Button
          variant="outline"
          className="flex-1 items-center justify-center space-x-2 py-2 hover:cursor-pointer"
          onClick={() => handleSocialLogin("github")}
        >
          <GitHubIcon className="size-5" aria-hidden={true} />
          <span className="text-sm font-medium">Login with GitHub</span>
        </Button>
        <Button
          variant="outline"
          className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0 hover:cursor-pointer"
          onClick={() => handleSocialLogin("google")}
        >
          <GoogleIcon className="size-4" aria-hidden={true} />
          <span className="text-sm font-medium">Login with Google</span>
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

      <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
        <div>
          <Label
            htmlFor="email-login-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email-login-04"
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
            htmlFor="password-login-04"
            className="text-sm font-medium text-foreground dark:text-foreground"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password-login-04"
            name="password"
            autoComplete="current-password"
            placeholder="********"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label
              htmlFor="remember-me"
              className="text-sm font-medium text-foreground dark:text-foreground cursor-pointer"
            >
              Remember me
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-4 w-full py-2 font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
        Forgot your password?{" "}
        <Link
          href="/reset-password"
          className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
        >
          Reset password
        </Link>
      </p>
    </div>
  );
}
