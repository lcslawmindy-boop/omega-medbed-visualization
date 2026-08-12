import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

export const DONATION_THRESHOLD = 2500;

/**
 * PDF documents are admin-only. Investors gain access by an approved
 * access request or a verified donation of $2,500 or more.
 */
export function usePdfAccess() {
  const [state, setState] = useState({ loading: true, allowed: false, user: null, request: null });

  const load = async () => {
    let user = null;
    try {
      user = await base44.auth.me();
    } catch {
      setState({ loading: false, allowed: false, user: null, request: null });
      return;
    }
    if (user.role === "admin") {
      setState({ loading: false, allowed: true, user, request: null });
      return;
    }
    const reqs = await base44.entities.DocAccessRequest.filter({ created_by_id: user.id }, "-created_date", 1);
    const request = reqs[0] || null;
    const allowed = !!request && (request.status === "approved" || (request.donation_amount || 0) >= DONATION_THRESHOLD);
    setState({ loading: false, allowed, user, request });
  };

  useEffect(() => { load(); }, []);

  return { ...state, reload: load };
}