"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Goal } from "@/types";
import Header from "@/components/Header";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import SocialShareButton from "@/components/SocialShareButton";

const Layout: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const { fetchGoals, addGoal, updateGoal } = useStore();

  useEffect(() => {
    if (session) {
      fetchGoals(session.user.id).then((data) => {
        setGoals(data);
      });
    }
  }, [session, fetchGoals]);

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">FitTrack Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GoalInput goalType="Weight Loss" />
          <GoalInput goalType="Workout Frequency" />
          <GoalInput goalType="Distance Running" />
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">My Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
              <p className="text-gray-600">
                Target: {goal.target} {goal.type === "Distance Running" ? "km" : ""}
              </p>
              <p className="text-gray-600">Deadline: {goal.deadline}</p>
              <ProgressChart
                goalId={goal.id}
                goalType={goal.type}
                progress={goal.progress}
                target={goal.target}
              />
              <SocialShareButton
                title={`FitTrack Goal: ${goal.title}`}
                url={`https://www.fittrack.com/goal/${goal.id}`}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Layout;