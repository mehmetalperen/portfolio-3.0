import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Kadra owner dashboard (ANILAR spec 33 §3) — a hidden, unlisted route. Lazy so the portfolio
// bundle doesn't carry supabase-js/bootstrap for normal visitors, and so the dashboard chunk
// only ever loads on this exact path. Netlify serves index.html here via public/_redirects.
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

const isAdminRoute =
  window.location.pathname.replace(/\/+$/, "") === "/secretadmindashboard";

ReactDOM.render(
  isAdminRoute ? (
    <Suspense fallback={null}>
      <AdminDashboard />
    </Suspense>
  ) : (
    <App />
  ),
  document.getElementById("root")
);
