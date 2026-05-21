import { UIStateProvider } from "@/components/obsidian/providers/UIStateProvider";
import { BlurFade } from "@/components/magicui/blur-fade";
import DotPattern from "@/components/magicui/dot-pattern";
import { MacbookComponent } from "@/components/ui/macbook";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Image from "next/image";
import WordFadeIn from "@/components/ui/word-fade-in";
import { Highlighter } from "@/components/magicui/highlighter";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/copy-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Features } from "@/components/features";

export const dynamic = "force-static";

// ─── EDIT THESE TO CUSTOMIZE YOUR SITE ───────────────────────────────────────

const SCRIPT_NAME = "DolphinV1";
const SCRIPT_TAGLINE = "The best visual spoofer for Rivals";
const SCRIPT_DESCRIPTION = "Visual spoofing & skin changing for Rivals";
const KEY_SYSTEM_INFO = "Free 6-hour keys are available via Linkvertise on our key page.";
const DISCORD_INVITE = "https://discord.gg/7qQMDsJnPk"; // ← replace with your Discord invite
const SCRIPT_LOADSTRING = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/dolphin231/yes/refs/heads/main/DolphinV1"))()'; // ← replace with your loadstring
const SITE_MADE_BY = "@dolphinbackup on discord"; // ← your name/handle

// ─────────────────────────────────────────────────────────────────────────────

export default async function Home() {
  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavbarBrand>
          <Image
            className="mr-2"
            alt={SCRIPT_NAME}
            src="/icon.png"
            width={25}
            height={25}
          />
          <p className="font-bold text-inherit">{SCRIPT_NAME}</p>
        </NavbarBrand>

        <NavbarContent justify="end" className="mt-4 mb-4">
<NavbarItem>
  <Link
    href="/getkey"
    className="relative text-foreground transition-colors hover:text-neutral-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
  >
    Get a Key
  </Link>
</NavbarItem>
          <NavbarItem>
            <Link
              href={DISCORD_INVITE}
              target="_blank"
              className="relative text-foreground transition-colors hover:text-neutral-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              Discord
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="overflow-x-hidden group">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-50",
            "group-aria-hidden:hidden",
          )}
        />

        <div className="overflow-hidden w-full">
          <MacbookComponent
            title={
              <div className="flex flex-col items-center justify-center">
                <BlurFade delay={0.2 + 2 * 0.05}>
                  <h1 className="text-6xl font-bold text-center">{SCRIPT_NAME}</h1>
                </BlurFade>

                <BlurFade delay={0.2 + 3 * 0.05}>
                  <div className="text-2xl flex flex-row justify-center items-center gap-2 mt-2">
                    <span>{SCRIPT_DESCRIPTION}</span>
                  </div>
                </BlurFade>

                <BlurFade delay={0.2 + 4 * 0.05}>
                  <div className="flex flex-row items-center justify-center mt-4 gap-2">
                    <Input
                      type="text"
                      className="overflow-hidden text-ellipsis min-w-[300px]"
                      readOnly
                      value={SCRIPT_LOADSTRING}
                    />
                    <CopyButton text={SCRIPT_LOADSTRING} />

                    <Link
                      aria-label="Discord Server"
                      href={DISCORD_INVITE}
                      target="_blank"
                    >
                      <ShinyButton className="px-2" aria-label="Discord Server">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 48 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M40.6606 3.08587C37.5127 1.62534 34.1825 0.587574 30.7579 0C30.3314 0.764729 29.833 1.79329 29.4893 2.61157C25.7971 2.06103 22.1387 2.06103 18.5144 2.61157C18.1709 1.79348 17.6612 0.764729 17.2307 0C13.8029 0.587845 10.4698 1.62826 7.32043 3.0935C1.05343 12.4846 -0.645507 21.6422 0.203868 30.6702C4.36056 33.7483 8.38881 35.6182 12.3492 36.8418C13.3334 35.4996 14.2035 34.0786 14.9504 32.5935C13.5284 32.0567 12.1576 31.3951 10.8542 30.6167C11.1972 30.3646 11.5322 30.1018 11.8585 29.8289C19.7564 33.4921 28.3379 33.4921 36.1416 29.8289C36.4694 30.1 36.8042 30.3627 37.1457 30.6167C35.8402 31.3971 34.4669 32.06 33.0421 32.5974C33.7932 34.0885 34.6617 35.5109 35.6432 36.8455C39.6074 35.6221 43.6394 33.7522 47.7961 30.6702C48.7928 20.2046 46.0936 11.1309 40.6606 3.08569V3.08587ZM16.0264 25.1182C13.6555 25.1182 11.7111 22.9233 11.7111 20.2505C11.7111 17.5778 13.6141 15.3792 16.0264 15.3792C18.439 15.3792 20.3832 17.5739 20.3417 20.2505C20.3455 22.9233 18.439 25.1182 16.0264 25.1182ZM31.9735 25.1182C29.6026 25.1182 27.6584 22.9233 27.6584 20.2505C27.6584 17.5778 29.5611 15.3792 31.9735 15.3792C34.3861 15.3792 36.3302 17.5739 36.2888 20.2505C36.2888 22.9233 34.3861 25.1182 31.9735 25.1182Z"
                            fill="#5865F2"
                          />
                        </svg>
                      </ShinyButton>
                    </Link>
                  </div>
                </BlurFade>
              </div>
            }
            src={`/preview.png`} // ← drop a screenshot of your script into /public/preview.png
            showGradient={true}
          />
        </div>

        <UIStateProvider>
  <Features />
</UIStateProvider>

        <div className="flex flex-col items-center justify-center px-2 text-center mt-10">

          <h1 className="text-2xl font-bold mt-[2.5rem] text-center">
            <Highlighter action="underline" color="#38bdf8" isView>
              {SCRIPT_NAME}
            </Highlighter>
            {" "}FAQ
          </h1>

          <Accordion
            id="faq"
            type="single"
            collapsible
            className="max-w-[1000px] w-[50vw] max-md:w-[75vw] mt-5"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this free?</AccordionTrigger>
              <AccordionContent>
                {KEY_SYSTEM_INFO} Join the{" "}
                <Link className="underline" href={DISCORD_INVITE} target="_blank">Discord</Link>{" "}
                to get yours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What does {SCRIPT_NAME} do?</AccordionTrigger>
              <AccordionContent>
                {SCRIPT_NAME} is a visual spoofing and skin changing tool for Rivals on Roblox. It lets you change how your character looks to other players without affecting gameplay.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do I use it?</AccordionTrigger>
              <AccordionContent>
                Copy the loadstring above, paste it into your executor, and run it inside Rivals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What executors are supported?</AccordionTrigger>
              <AccordionContent>
                {SCRIPT_NAME} works with most popular executors. Join the Discord for a full compatibility list.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Where do I report bugs?</AccordionTrigger>
              <AccordionContent>
                Join the{" "}
                <Link className="underline" href={DISCORD_INVITE} target="_blank">
                  Discord server
                </Link>{" "}
                and post in the bugs channel.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Separator className="mt-[5rem] w-screen" />

          <div className="px-10 py-6 w-screen flex flex-row justify-between items-center max-md:justify-center max-md:flex-col">
            <div className="px-2 py-2 flex flex-row items-center gap-2">
              <Image alt={SCRIPT_NAME} src="/icon.png" width={25} height={25} />
              <div>
                <p className="text-xs text-left">{SCRIPT_NAME}</p>
                <p className="text-muted-foreground text-xs">
                  Site made by {SITE_MADE_BY}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs px-2 py-2 text-right max-md:text-center max-md:mt-5">
              This software is not affiliated, associated, authorized, endorsed
              by, or
              <br />
              in any way officially connected with Roblox or any of its
              subsidiaries or its affiliates.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}