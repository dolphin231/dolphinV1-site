"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserIcon } from "lucide-react";

interface UserAccountOverviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

export function UserAccountOverview({ session }: UserAccountOverviewProps) {
  const user = session?.user;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Your connected Discord account information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
            <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
            <AvatarFallback>
                <UserIcon className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-xl font-bold leading-none">{user?.name}</p>
            <p className="text-sm text-muted-foreground blur-xs hover:blur-none active:blur-none transition-[filter] duration-100 cursor-pointer select-none">{user?.email}</p>
          </div>
        </div>

        <div className="grid gap-4 pt-2">
            <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Discord ID</p>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {user?.id}
                </code>
            </div>
            <div className="space-y-1">
                 <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Linked Platforms</p>
                 <div className="flex gap-2">
                    <Badge variant="secondary" className="font-normal">Discord</Badge>
                 </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
