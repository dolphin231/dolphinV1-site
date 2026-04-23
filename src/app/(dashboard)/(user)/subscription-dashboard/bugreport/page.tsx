import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import BugreportCard from '@/components/submit/bugreport-card';
import { GetUserSubscription } from '@/server/dashutils';

export default async function BugReportPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect("/sign-in");
  }

  const subscription = await GetUserSubscription(session.user.id);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Bug Report</h1>
        <p className="text-muted-foreground">
          Report a bug or issue you encountered while using mspaint.
        </p>
      </div>
      
      <BugreportCard
          session={session}
          subscription={subscription}
      />
    </div>
  );
}
