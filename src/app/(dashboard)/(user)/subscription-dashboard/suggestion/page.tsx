import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { GetUserSubscription } from '@/server/dashutils';
import SuggestionCard from '@/components/submit/suggestion-card';

export default async function SuggestionPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect("/sign-in");
  }

  const subscription = await GetUserSubscription(session.user.id);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Suggestion</h1>
        <p className="text-muted-foreground">
          Suggest a new feature or improvement for mspaint.
        </p>
      </div>
      
      <SuggestionCard
          session={session}
          subscription={subscription}
      />
    </div>
  );
}
