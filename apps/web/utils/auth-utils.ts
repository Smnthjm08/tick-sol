import { authClient } from "@workspace/common/auth-client";

export const handleSocialLogin = async (provider: "github" | "google") => {
  await authClient.signIn.social({
    provider,
    callbackURL: "/dashboard",
    errorCallbackURL: "/error",
    newUserCallbackURL: "/onboarding",
  });
};
