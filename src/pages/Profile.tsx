import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "@/api/api";
import Button from "@/components/common/Button";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  memberSince: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch {
        // Not authenticated — redirect to sign in
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/signin");
    } catch {
      navigate("/signin");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-16 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>

      <div className="mt-8 rounded-2xl border border-border bg-card p-8">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {initials}
          </div>
          <div>
            <p className="text-xl font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 space-y-4 border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Full name</span>
            <span className="text-sm font-medium text-foreground">{user.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-foreground">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Member since</span>
            <span className="text-sm font-medium text-foreground">
              {new Date(user.memberSince).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Account ID</span>
            <span className="text-xs font-mono text-muted-foreground">{user.id}</span>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 border-t border-border pt-6">
          <Button variant="outline" onClick={handleLogout} className="text-destructive hover:bg-destructive/10">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
