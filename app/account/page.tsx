import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getUserById } from "@/lib/db";
import AccountPasswordForm from "./AccountPasswordForm";

/**
 * /account — Password change page.
 * Accessible to all authenticated users. Server Component that passes the
 * user's name and email to the client-side form component.
 */
export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getUserById(session.userId);
  if (!user) redirect("/login");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(ellipse at 60% 20%, #16103a 0%, #06060e 55%, #03080f 100%)",
      }}
    >
      {/* Background orbs */}
      <div
        className="orb w-[500px] h-[500px] top-[-20%] right-[-15%] animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(124,111,245,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="orb w-[350px] h-[350px] bottom-[-10%] left-[-10%] animate-float"
        style={{
          animationDelay: "-3s",
          background:
            "radial-gradient(circle, rgba(0,212,154,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl font-black text-white tracking-tight">
            My{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #9b8dff, #00e5a8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Account
            </span>
          </h1>
          <p className="text-[#7070a0] text-sm font-medium mt-1">
            {user.name} &middot; {user.email}
          </p>
        </div>

        {/* Glass card */}
        <div
          className="rounded-2xl p-7 animate-stagger-1"
          style={{
            background:
              "linear-gradient(145deg, rgba(20,18,45,0.85) 0%, rgba(14,12,30,0.9) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(155,141,255,0.2)",
            boxShadow:
              "0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(155,141,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <AccountPasswordForm />
        </div>

        {/* Back link */}
        <p className="text-center mt-6">
          <a
            href="/dashboard"
            className="text-[#6060a0] hover:text-[#9b8dff] text-sm transition-colors"
          >
            ← Back to Dashboard
          </a>
        </p>
      </div>
    </div>
  );
}
