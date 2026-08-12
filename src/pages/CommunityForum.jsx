import React, { useEffect, useState } from "react";
import PageShell from "@/components/shell/PageShell";
import { base44 } from "@/api/base44Client";
import ForumComposer from "@/components/community/ForumComposer";
import ForumPostCard from "@/components/community/ForumPostCard";
import { CONTACT_EMAIL } from "@/data/contact";

export default function CommunityForum() {
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [me, setMe] = useState({ name: "", badge: "" });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [p, r] = await Promise.all([
      base44.entities.ForumPost.list("-created_date", 100),
      base44.entities.ForumReply.list("-created_date", 300),
    ]);
    setPosts(p);
    setReplies(r);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      let user = null;
      try { user = await base44.auth.me(); } catch { user = null; }
      if (user?.email) {
        const donor = (await base44.entities.Donor.filter({ email: user.email }, "-amount", 1))[0];
        setMe({ name: donor?.display_name || user.full_name || "", badge: donor?.badge || "" });
      }
      await load();
    })();
  }, []);

  return (
    <PageShell title="COMMUNITY FORUM" subtitle={`Open discussion · questions to ${CONTACT_EMAIL}`} accent="var(--sky)">
      <ForumComposer defaultName={me.name} badge={me.badge} onPosted={load} />

      {loading ? (
        <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>LOADING DISCUSSIONS…</div>
      ) : posts.length === 0 ? (
        <div className="bs-card p-4 text-center font-body" style={{ background: "var(--bg-panel)", borderRadius: 16, fontSize: 11, color: "var(--text-muted)" }}>
          No discussions yet — post the first one above.
        </div>
      ) : (
        posts.map((p) => (
          <ForumPostCard
            key={p.id}
            post={p}
            replies={replies.filter((r) => r.post_id === p.id).slice().reverse()}
            onChanged={load}
          />
        ))
      )}
    </PageShell>
  );
}