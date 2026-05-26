"use client";

import { useState } from "react";
import { IconWarning } from "@/components/Icons";
import { createClient } from "@/lib/supabase/client";

/**
 * Client Component — password change form.
 * Calls supabase.auth.updateUser() to update the password for the currently
 * authenticated user. No server round-trip required.
 */
export default function AccountPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Re-authenticate with the current password first to verify identity.
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setError("Session expired. Please log in again.");
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        setError("Current password is incorrect.");
        return;
      }

      // Update to the new password.
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(155,141,255,0.2)",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(155,141,255,0.5)";
    e.currentTarget.style.boxShadow =
      "0 0 0 3px rgba(155,141,255,0.12), inset 0 1px 3px rgba(0,0,0,0.3)";
  };

  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(155,141,255,0.2)";
    e.currentTarget.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.3)";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-white font-bold text-base mb-1">Change Password</h2>
      <p className="text-[#6060a0] text-xs mb-4">
        Your new password must be at least 8 characters.
      </p>

      <div>
        <label className="block text-[10px] font-bold text-[#6060a0] mb-2 tracking-[0.2em] uppercase">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#404060] focus:outline-none transition-all duration-200"
          style={inputStyle}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-[#6060a0] mb-2 tracking-[0.2em] uppercase">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#404060] focus:outline-none transition-all duration-200"
          style={inputStyle}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold text-[#6060a0] mb-2 tracking-[0.2em] uppercase">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#404060] focus:outline-none transition-all duration-200"
          style={inputStyle}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
      </div>

      {error && (
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm"
          style={{
            background: "rgba(255,80,80,0.1)",
            border: "1px solid rgba(255,80,80,0.2)",
            color: "#ff8080",
          }}
        >
          <IconWarning size={14} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div
          className="rounded-xl px-3 py-2.5 text-sm"
          style={{
            background: "rgba(0,212,154,0.1)",
            border: "1px solid rgba(0,212,154,0.25)",
            color: "#00d49a",
          }}
        >
          Password updated successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all duration-200 active:scale-95 mt-2 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7c6ff5 0%, #00d49a 100%)",
          boxShadow:
            "0 0 24px rgba(124,111,245,0.45), 0 4px 16px rgba(0,0,0,0.4)",
        }}
      >
        <span className="relative z-10">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating
            </span>
          ) : (
            "Update Password"
          )}
        </span>
      </button>
    </form>
  );
}
