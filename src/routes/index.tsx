import { useState } from "react";
import { AlertTriangle, Bell, Check, ChevronRight, CircleHelp, Clock3, Headphones, MapPin, MessageCircle, PackageCheck, RefreshCw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import productImage from "@/assets/atlas-pour-over.jpg";

type Scenario = "delayed" | "not-received" | "unavailable";

const scenarios = {
  delayed: {
    tab: "Delayed",
    eyebrow: "Delivery update",
    title: "Your parcel is running late",
    badge: "Delayed",
    estimateLabel: "New estimated delivery",
    estimate: "Friday, 7 June · by 8 PM",
    detail: "The carrier reported a sorting delay. Your parcel is still moving and is now expected two days later than planned.",
    alert: "If it hasn't arrived by Friday evening, we'll open a priority investigation.",
    action: "Get delivery help",
    actionIcon: Headphones,
    step: 2,
  },
  "not-received": {
    tab: "Not received",
    eyebrow: "Delivered 2 hours ago",
    title: "Marked delivered, but missing?",
    badge: "Needs attention",
    estimateLabel: "Reported delivery",
    estimate: "Today · 1:42 PM",
    detail: "The carrier marked this order as delivered near your front entrance. Check nearby safe places or with a neighbor first.",
    alert: "Still can't find it? Report the missing parcel and we'll contact the carrier for you.",
    action: "Report missing parcel",
    actionIcon: AlertTriangle,
    step: 3,
  },
  unavailable: {
    tab: "No tracking yet",
    eyebrow: "Preparing your order",
    title: "Tracking will be available soon",
    badge: "Getting ready",
    estimateLabel: "Estimated delivery",
    estimate: "Monday, 10 June · 9 AM–1 PM",
    detail: "Your order is packed and waiting for carrier pickup. Live updates begin as soon as the first scan is recorded.",
    alert: "No action needed—we'll notify you when tracking goes live.",
    action: "Notify me when it ships",
    actionIcon: Bell,
    step: 1,
  },
} as const;

const steps = [
  { name: "Order confirmed", date: "Mon 3 Jun · 9:12 AM" },
  { name: "Packed & shipped", date: "Tue 4 Jun · 4:40 PM" },
  { name: "Out for delivery", date: "Wed 5 Jun · 8:05 AM" },
  { name: "Delivered", date: "Awaiting update" },
];

export function Index() {
  const [scenario, setScenario] = useState<Scenario>("delayed");
  const [notice, setNotice] = useState("");
  const state = scenarios[scenario];
  const ActionIcon = state.actionIcon;

  const act = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary font-display text-lg font-semibold text-primary-foreground">P</div>
            <div className="min-w-0">
              <p className="truncate font-display text-xl font-semibold leading-none">Parcel & Post</p>
              <p className="mt-1 text-xs text-muted-foreground">Order tracking</p>
            </div>
          </div>
          <Button variant="paper" size="icon" aria-label="Open help" title="Help" onClick={() => act("Support is available every day, 8 AM–10 PM.")}>
            <CircleHelp />
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Order #PRC-48213</p>
            <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Follow your delivery</h1>
          </div>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground lg:mt-0 lg:text-right">Updates from our warehouse to your door, with help close at hand if plans change.</p>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-1 rounded-lg bg-secondary p-1" role="tablist" aria-label="Preview order situation">
          {(Object.keys(scenarios) as Scenario[]).map((key) => (
            <Button key={key} variant={scenario === key ? "editorial" : "ghost"} className="h-auto min-h-10 whitespace-normal rounded-md px-2 py-2 text-xs sm:text-sm" role="tab" aria-selected={scenario === key} onClick={() => { setScenario(key); setNotice(""); }}>
              {scenarios[key].tab}
            </Button>
          ))}
        </div>

        <div key={scenario} className="tracker-enter grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,.8fr)] lg:items-start">
          <section className="overflow-hidden rounded-lg bg-card shadow-sm ring-1 ring-border/60">
            <div className="p-5 sm:p-7 lg:p-8">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{state.eyebrow}</p>
                  <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{state.title}</h2>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${scenario === "delayed" || scenario === "not-received" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>{state.badge}</span>
              </div>

              <div className={`mt-6 rounded-lg p-4 ${scenario === "delayed" || scenario === "not-received" ? "bg-destructive/10" : "bg-secondary"}`}>
                <div className="flex items-start gap-3">
                  <div className={`grid size-10 shrink-0 place-items-center rounded-lg ${scenario === "delayed" || scenario === "not-received" ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"}`}>
                    {scenario === "not-received" ? <PackageCheck /> : scenario === "unavailable" ? <Clock3 /> : <Truck />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{state.estimateLabel}</p>
                    <p className="mt-0.5 font-semibold">{state.estimate}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{state.detail}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">Delivery journey</h3>
                  <span className="text-xs font-medium text-muted-foreground">{Math.min(state.step + 1, 4)} of 4 steps</span>
                </div>
                <ol>
                  {steps.map((step, index) => {
                    const complete = index < state.step || scenario === "not-received";
                    const current = index === state.step && scenario !== "not-received";
                    return (
                      <li key={step.name} className="grid grid-cols-[24px_minmax(0,1fr)] gap-4">
                        <div className="flex flex-col items-center">
                          <span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 text-[10px] ${complete ? "border-primary bg-primary text-primary-foreground" : current ? "border-primary bg-card ring-4 ring-primary/10" : "border-border bg-card text-muted-foreground"}`}>
                            {complete ? <Check className="size-3" /> : null}
                          </span>
                          {index < steps.length - 1 ? <span className={`min-h-10 w-px flex-1 ${complete ? "bg-primary/40" : "bg-border"}`} /> : null}
                        </div>
                        <div className="min-w-0 pb-5">
                          <p className={`text-sm font-semibold ${!complete && !current ? "text-muted-foreground" : ""}`}>{step.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{scenario === "unavailable" && index > 1 ? "Tracking starts after carrier pickup" : step.date}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className={`rounded-lg px-4 py-3 text-sm leading-6 ${scenario === "delayed" || scenario === "not-received" ? "bg-destructive/10 text-foreground" : "bg-secondary text-secondary-foreground"}`}>
                <span className="font-semibold">Next step: </span>{state.alert}
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-lg bg-card p-5 shadow-sm ring-1 ring-border/60">
              <h3 className="font-display text-xl font-semibold">Order summary</h3>
              <div className="mt-4 flex items-center gap-4">
                <img src={productImage} alt="Sage ceramic Atlas pour-over coffee set" width={816} height={816} className="size-20 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">Atlas Pour-Over Set</p>
                  <p className="mt-1 text-sm text-muted-foreground">Sage · Qty 1</p>
                  <p className="mt-2 text-sm font-semibold">$86.00</p>
                </div>
              </div>
              <Button variant="paper" size="action" className="mt-5 w-full justify-between ring-1 ring-border" onClick={() => act("Order details opened for #PRC-48213.")}>
                View order details <ChevronRight />
              </Button>
              <div className="mt-4 flex gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <p>Delivering to 214 Rowan Street, Apt 4B</p>
              </div>
            </section>

            <section className="rounded-lg bg-card p-5 shadow-sm ring-1 ring-border/60">
              <h3 className="font-display text-xl font-semibold">Need a hand?</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Our delivery team usually replies within two minutes.</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Button variant={scenario === "not-received" ? "alert" : "editorial"} size="action" className="w-full" onClick={() => act(`${state.action} started.`)}>
                  <ActionIcon /> {state.action}
                </Button>
                <Button variant="paper" size="action" className="w-full ring-1 ring-border" onClick={() => act("Support chat is ready.")}>
                  <MessageCircle /> Contact support
                </Button>
              </div>
            </section>

            <div className="flex items-center gap-3 px-1 text-xs text-muted-foreground">
              <RefreshCw className="size-4 shrink-0" />
              {scenario === "unavailable" ? "We'll check again automatically." : "Last carrier update 4 minutes ago."}
            </div>
          </aside>
        </div>
      </div>

      {notice ? <div role="status" className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-lg bg-foreground px-4 py-3 text-center text-sm font-medium text-background shadow-lg">{notice}</div> : null}
    </main>
  );
}
