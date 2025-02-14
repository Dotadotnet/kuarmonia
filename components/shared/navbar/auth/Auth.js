import React from "react";
import UserNav from "@/components/icons/UserNav";
import Dashboard from "@/components/icons/Dashboard";
import { useSelector } from "react-redux";

function Auth() {
    const user = useSelector((state) => state?.auth);

  return (
    <div>
      {user && Object?.keys(user)?.length > 0 ? (
        <button
          className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          onClick={() => window.open("/dashboard", "_self")}
        >
          <Dashboard className="h-6 w-6" />
        </button>
      ) : (
        <button
          className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserNav className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default Auth;
