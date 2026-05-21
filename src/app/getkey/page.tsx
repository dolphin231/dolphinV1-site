"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

const BACKEND = "https://294f96d1-5cc4-4b07-aa2a-6a03c3fcef55-00-1wrv7m9ub9zep.kirk.replit.dev";
const LINKVERTISE = "https://link-hub.net/5901706/grOvM6boUYms";
const DISCORD_INVITE = "https://discord.gg/7qQMDsJnPk";
const SITE_URL = "https://dolphinv1.netlify.app/getkey";

export default function GetKeyPage() {
  const searchParams = useSearchParams();
  const [key, setKey] = useState("");
  const [expires, setExpires] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = searchParams.get("lv_token") || searchParams.get("token");
    if (token) {
      generateKey(token);
    }
  }, [searchParams]);

  async function generateKey(token: string) {
    setStatus("loading");
    try {
      const res = await fetch(`${BACKEND}/getfreekey?token=${encodeURIComponent(token)}`);
      const data = await res.json();
      if (data.success) {
        setKey(data.key);
        const exp = new Date(data.expires);
        setExpires(exp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        setStatus("success");
        // Clean URL
        window.history.replaceState({}, "", "/getkey");
      } else {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not reach server. Try again.");
      setStatus("error");
    }
  }

  function handleGetKey() {
    const returnUrl = encodeURIComponent(SITE_URL);
    window.location.href = `${LINKVERTISE}?r=${returnUrl}`;
  }

  function copyKey() {
    navigator.clipboard.writeText(key).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavbarBrand>
          <Image className="mr-2" alt="DolphinV1" src="/icon.png" width={25} height={25} />
          <p className="font-bold text-inherit">DolphinV1</p>
        </NavbarBrand>
        <NavbarContent justify="end" className="mt-4 mb-4">
          <NavbarItem>
            <Link href="/" className="relative text-foreground transition-colors hover:text-neutral-200">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={DISCORD_INVITE} target="_blank" className="relative text-foreground transition-colors hover:text-neutral-200">
              Discord
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">🐬</div>
          <h1 className="text-3xl font-bold mb-2">
            Get a <span className="text-sky-400">Free Key</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Complete a quick Linkvertise step to get your free 6-hour key.
          </p>

          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Steps */}
            <div className="space-y-3 mb-6 text-left">
              {[
                "Click the button and complete the Linkvertise step",
                "You'll be redirected back here automatically",
                "Your free key will be generated instantly",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sky-400 font-bold text-xs flex-shrink-0">
                    {i + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border my-6" />

            {/* Button / Loading / Success / Error */}
            {status === "idle" && (
              <button
                onClick={handleGetKey}
                className="w-full bg-sky-500 hover:bg-sky-400 transition-colors text-white font-bold py-3 px-6 rounded-xl"
              >
                🔑 Get Free Key
              </button>
            )}

            {status === "loading" && (
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-3">
                <div className="w-4 h-4 border-2 border-border border-t-sky-400 rounded-full animate-spin" />
                Generating your key...
              </div>
            )}

            {status === "success" && (
              <div className="space-y-3">
                <div className="bg-background border border-sky-400/30 rounded-xl p-4 font-mono text-sky-400 text-lg tracking-widest break-all">
                  {key}
                </div>
                <button
                  onClick={copyKey}
                  className="w-full bg-card hover:bg-accent border border-border transition-colors text-foreground font-medium py-2.5 px-6 rounded-xl text-sm"
                >
                  {copied ? "✅ Copied!" : "📋 Copy Key"}
                </button>
                <p className="text-red-400 text-xs">⏰ Expires at {expires} (6 hours)</p>
                <p className="text-muted-foreground text-xs">
                  Redeem this key in the{" "}
                  <Link href={DISCORD_INVITE} target="_blank" className="underline text-sky-400">
                    Discord bot
                  </Link>
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-3">
                <p className="text-red-400 text-sm">❌ {errorMsg}</p>
                <button
                  onClick={handleGetKey}
                  className="w-full bg-sky-500 hover:bg-sky-400 transition-colors text-white font-bold py-3 px-6 rounded-xl"
                >
                  🔑 Try Again
                </button>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-xs mt-6">
            Keys last 6 hours • One per Linkvertise completion • Non-transferable
          </p>
        </div>
      </main>
    </>
  );
}