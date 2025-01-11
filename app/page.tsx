import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  let user = null;

  try {
    user = await currentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }

  // Sanitize user data before passing to the client-side components.
  const sanitizedUser = user ? JSON.parse(JSON.stringify(user)) : null;

  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto flex justify-between gap-8">
        {/* Sidebar */}
        <Sidebar user={sanitizedUser} />
        {/* Feed */}
        <Feed user={sanitizedUser} />
        {/* News */}
        <News />
      </div>
    </div>
  );
}
