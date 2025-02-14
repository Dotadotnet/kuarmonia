import React from "react";
import UserNav from "@/components/icons/UserNav";
import Dashboard from "@/components/icons/Dashboard";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Auth() {
  const user = useSelector((state) => state?.auth);
  const router = useRouter();

  return (
    <div>
      {user && Object?.keys(user)?.length > 0 ? (
        <button
          className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          onClick={() => router.push("/dashboard")}
        >
          <Dashboard className="h-6 w-6" />
        </button>
      ) : (
        <button
          className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          onClick={() => router.push("/auth/signup")}
        >
          <UserNav className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default Auth;
