import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">PM Lab Prototype</h1>
        <p className="mt-2 text-lg text-foreground/60">
          Sign in to get started with your prototype.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Log in
        </Link>
        <Link
          href="/auth/signup"
          className="rounded-lg border border-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
