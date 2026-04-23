import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { GetUserPurchaseHistory, GetUserSubscription } from '@/server/dashutils';
import { UserSubscriptionOverview } from '@/components/dashboard/user-subscription-overview';
import { UserAccountOverview } from '@/components/dashboard/user-account-overview';

export default async function SubscriptionDashboard() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return redirect("/sign-in");
  }

  const subscription = await GetUserSubscription(session.user.id);
  const purchaseHistory = await GetUserPurchaseHistory(session.user.id);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="text-muted-foreground">
          Manage your subscription, account settings and view your purchase history.
        </p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <UserSubscriptionOverview
            subscription={subscription}
            purchaseHistory={purchaseHistory}
          />
        </div>
        <div className="lg:col-span-1">
          <UserAccountOverview session={session} />
        </div>
      </div>
    </div>
  );
}
