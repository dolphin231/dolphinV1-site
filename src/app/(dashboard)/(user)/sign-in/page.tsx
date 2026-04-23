import { auth, signIn } from "@/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default async function SignInPage() {
  const session = await auth();
  if (session && session.user) return redirect("/subscription-dashboard");

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6 md:p-10">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="relative z-10 w-full max-w-sm">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
             <Image
              src="/icon.png"
              alt="mspaint logo"
              width={40}
              height={40}
              className="rounded-lg shadow-sm"
            />
            <span className="text-xl tracking-tight">mspaint</span>
          </Link>
        </div>
        <Card className="border-border/60 bg-background/60 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Sign in
            </CardTitle>
            <CardDescription>
              Connect your Discord to manage your subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form
              action={async () => {
                "use server";
                await signIn("discord");
              }}
            >
               <ShimmerButton
                borderRadius="8px"
                shimmerColor="#5865F2"
                shimmerSize="0.1em"
                shimmerDuration="2s"
                className="w-full h-11"
              >
                <span className="flex items-center justify-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white font-semibold">
                  Continue with Discord
                </span>
              </ShimmerButton>
            </form>
            <div className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link
                href="/tos"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
