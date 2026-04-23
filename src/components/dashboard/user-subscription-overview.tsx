"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { QueryResultRow } from "@vercel/postgres";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LockKeyholeIcon,
  LockKeyholeOpenIcon,
  PackageIcon,
  CircleAlertIcon,
  GiftIcon,
  ExternalLinkIcon,
  CodeIcon,
  FingerprintIcon,
} from "lucide-react";
import { toast } from "sonner";
import { getTimeAgoFromUnix, normalizeEpochMs } from "@/lib/utils";
import { TimeUpdater } from "../time-updater";
import { ClientCodeBlock, getScriptCode } from "../codeblock";
import { CopyButtonWithText } from "../copy-button";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Input } from "../ui/input";
import Link from "next/link";
import { RainbowButton } from "../magicui/rainbow-button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

interface UserSubscriptionOverviewProps {
  subscription: QueryResultRow | null;
  purchaseHistory: QueryResultRow[];
}

export function UserSubscriptionOverview({
  subscription,
  purchaseHistory,
}: UserSubscriptionOverviewProps) {
  const router = useRouter();
  const [hardwareIdDialog, setHardwareIdDialog] = React.useState(false);
  const [getScriptDialog, setGetScriptDialog] = React.useState(false);
  const [tosDialog, setTosDialog] = React.useState(false);
  const [getRedeemDialog, setRedeemDialog] = React.useState(false);
  const [getGiftKeyDialog, setGiftKeyDialog] = React.useState(false);
  const [key, setKey] = React.useState<string | null>(null);
  const [tosAccepted, setTosAccepted] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mspaint-tos-accepted") === "true";
    }
    return false;
  });

  const handleGetScript = () => {
    if (tosAccepted) {
      setGetScriptDialog(true);
    } else {
      setTosDialog(true);
    }
  };

  const handleAcceptTos = () => {
    localStorage.setItem("mspaint-tos-accepted", "true");
    setTosAccepted(true);
    setTosDialog(false);
    setGetScriptDialog(true);
  };

  const expirationDate = normalizeEpochMs(subscription?.expires_at) ?? 0;
  const userStatus: string = subscription ? subscription.user_status : "unlink";
  const userLuarmorKey = subscription?.lrm_serial ?? "unlink";

  const isMember = subscription != null;
  const isLifetime = expirationDate == -1;
  const isExpired = !isLifetime && expirationDate - Date.now() <= 0;
  const isKeySystemMember = subscription?.from_key_system === true;

  const isUnlink = userStatus === "unlink";
  const isResetState = userStatus === "reset";
  const isBanned = userStatus === "banned" || subscription?.is_banned;
  const isSubscriptionActive = (!isBanned && isMember) && (userStatus === "active" || isResetState || isLifetime);

  const lastSyncTimeText = getTimeAgoFromUnix(subscription?.last_sync);
  const timeLeftMs = expirationDate - Date.now();

  const handleRedeem = () => {
    if (!key) {
        toast.error("Please enter a key.");
        return;
    }

    toast.info("Redirecting to claim page...");
    if (key.startsWith("https://www.mspaint.cc/purchase/completed?serial=")) {
      window.open(key, "_blank");
    } else {
      window.open(`https://www.mspaint.cc/purchase/completed?serial=${encodeURIComponent(key)}`, "_blank");
    }
  };

  if (!isMember) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your mspaint subscription and access.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <PackageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No Active Subscription</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You don&apos;t have an active mspaint subscription.
            </p>
            <Link href="/shop" className="w-full max-w-xs">
              <RainbowButton className="w-full">Buy mspaint</RainbowButton>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Subscription Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your subscription status and purchase history.</CardDescription>
            </div>
            <Badge
              variant={isBanned ? "destructive" : isSubscriptionActive ? "default" : "secondary"}
              className="h-6"
            >
              {isBanned ? "BANNED" : userStatus.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <div className="flex items-center gap-2">
                {isBanned ? (
                  <p className="text-sm font-semibold text-red-500">Access Restricted</p>
                ) : isLifetime ? (
                  <p className="text-sm font-semibold text-green-500">Lifetime Access ★</p>
                ) : isExpired ? (
                  <p className="text-sm font-semibold text-red-500">Expired</p>
                ) : (
                  <div className="text-sm font-semibold">
                    <TimeUpdater initialTimeLeft={timeLeftMs} freezeAfterTimeout={true} />
                  </div>
                )}
              </div>
            </div>
            {isKeySystemMember && !isBanned && !isExpired && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="text-sm font-semibold text-green-500">Key System Key</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {isLifetime ? (
              <Button variant="outline" onClick={() => setGiftKeyDialog(true)}>
                <GiftIcon className="mr-2 h-4 w-4" />
                Send as Gift
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setRedeemDialog(true)}>
                {isKeySystemMember ? "Upgrade to Premium" : (isExpired ? "Renew" : "Extend")}
              </Button>
            )}

            {purchaseHistory.length > 0 && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <PackageIcon className="mr-2 h-4 w-4" />
                    History
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Purchase History</SheetTitle>
                    <SheetDescription>Your past purchases and subscription history.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 pl-4 relative">
                    <div className="space-y-5">
                      {purchaseHistory.map((purchase, index) => (
                        <div key={index} className="relative flex gap-3 text-sm">
                          {index < purchaseHistory.length - 1 && (
                            <div className="absolute left-[3px] top-[10px] bottom-[-24px] w-px bg-border" />
                          )}
                          <div className="relative z-10 mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full bg-primary" />
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">
                                {purchase.order_id.length > 20
                                  ? purchase.order_id.slice(0, 20) + "…"
                                  : purchase.order_id}
                              </p>
                              <Badge variant="secondary" className="text-[10px] shrink-0 px-1.5 py-0">
                                {purchase.key_duration || "Lifetime"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(purchase.claimed_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
          <p className="text-xs text-muted-foreground">Last synced {lastSyncTimeText}</p>
        </CardFooter>
      </Card>

      {/* Hardware ID Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FingerprintIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <CardTitle>Hardware ID</CardTitle>
              <CardDescription>Manage your hardware ID lock for mspaint.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">HWID Status</p>
            <p className="text-sm font-semibold">
              {isBanned ? (
                <span className="text-red-500">Locked (Banned)</span>
              ) : isResetState ? (
                <span className="text-yellow-500">Already Reset (or on Cooldown)</span>
              ) : (
                <span className="text-green-500">Locked</span>
              )}
            </p>
          </div>
          {!isBanned && !isExpired && (
            <Button
              variant="outline"
              onClick={() => setHardwareIdDialog(true)}
              disabled={isResetState}
              className="w-full sm:w-auto"
            >
              {isResetState ? <LockKeyholeOpenIcon className="mr-2 h-4 w-4" /> : <LockKeyholeIcon className="mr-2 h-4 w-4" />}
              {isResetState ? "HWID Reset" : "Reset HWID"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Script Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <CardTitle>Script</CardTitle>
              <CardDescription>Get your mspaint loader script.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!isBanned && !isExpired ? (
            <Button onClick={handleGetScript} className="w-full sm:w-auto">
              Get Script
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              {isBanned ? "Your access has been restricted." : "Your subscription has expired."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* TOS Dialog */}
      <ResponsiveDialog
        open={tosDialog}
        onOpenChange={setTosDialog}
        title="Terms of Service"
        description={
          <>
            By using mspaint, you agree to our{" "}
            <Link href="/tos" className="underline underline-offset-4 hover:text-foreground" target="_blank">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground" target="_blank">
              Privacy Policy
            </Link>
            .
          </>
        }
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setTosDialog(false)}>Cancel</Button>
            <Button onClick={handleAcceptTos}>I Accept</Button>
          </div>
        }
      >
        {null}
      </ResponsiveDialog>

      {/* Script Dialog */}
      <ResponsiveDialog
        open={getScriptDialog}
        onOpenChange={setGetScriptDialog}
        title="Your mspaint script"
        description="Click the copy button and paste it in your script executor."
        className="max-w-xl"
      >
        <div className="flex gap-3 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-yellow-600 dark:text-yellow-400">
          <CircleAlertIcon className="h-5 w-5 shrink-0" />
          <span className="text-sm">
            <strong>Key sharing is not allowed!</strong><br />
            Sharing your key will result in a permanent ban.
          </span>
        </div>
        <div className="my-4 overflow-hidden rounded-md border">
          <ClientCodeBlock
            serial={userLuarmorKey}
            disableCopyButton={true}
            classNameBlock="max-h-[300px]"
          />
        </div>
        <CopyButtonWithText
          text={getScriptCode(userLuarmorKey)}
          customOnClick={() => {
            toast.success("Script copied to clipboard.");
            setGetScriptDialog(false);
          }}
        />
      </ResponsiveDialog>

      {/* HWID Reset Dialog */}
      <ResponsiveDialog
        open={hardwareIdDialog}
        onOpenChange={setHardwareIdDialog}
        title="Confirm HWID reset?"
        description="You can only reset your HWID occasionally. Make sure you actually need to reset it."
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setHardwareIdDialog(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast.promise(
                  (async () => {
                    const response = await fetch("/api/reset-hwid", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ lrm_serial: subscription?.lrm_serial }),
                    });
                    if (!response.ok) {
                      const errorData = await response.json();
                      throw new Error(errorData.error || "HWID reset failed.");
                    }
                    return await response.json();
                  })(),
                  {
                    loading: "Resetting HWID...",
                    success: () => {
                      setHardwareIdDialog(false);
                      router.refresh();
                      return "HWID reset successful!";
                    },
                    error: (err) => err.message,
                  }
                );
              }}
            >
              Reset HWID
            </Button>
          </div>
        }
      >
        {null}
      </ResponsiveDialog>

      {/* Redeem Key Dialog */}
      <ResponsiveDialog
        open={getRedeemDialog}
        onOpenChange={setRedeemDialog}
        title="Redeem Key"
        description="Enter your mspaint key or full completion URL."
      >
        <div className="flex flex-col gap-4 py-4">
          <Input
            placeholder="Enter key here..."
            value={key ?? ""}
            onChange={(e) => setKey(e.target.value)}
          />
          <Button onClick={handleRedeem} className="w-full">Redeem Key</Button>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-sm text-muted-foreground">Don&apos;t have a key?</p>
          <Link href="/shop">
            <Button variant="link" className="h-auto p-0">
              Buy Subscription <ExternalLinkIcon className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </ResponsiveDialog>

      {/* Gift Key Dialog */}
      <ResponsiveDialog
        open={getGiftKeyDialog}
        onOpenChange={setGiftKeyDialog}
        title="Gift mspaint"
        description="Thank you for your lifetime support! If you want to gift mspaint to friends, you can purchase keys in our shop."
      >
        <div className="flex items-center justify-center py-6">
          <Link href="/shop" className="w-full">
            <Button className="w-full">Visit Shop</Button>
          </Link>
        </div>
      </ResponsiveDialog>
    </>
  );
}
