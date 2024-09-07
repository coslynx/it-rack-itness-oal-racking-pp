"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

interface ProgressChartProps {
  goalId: string;
  goalType: string;
  progress: number;
  target: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  goalId,
  goalType,
  progress,
  target,
}) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const data = [
      { name: "Progress", value: progress },
      { name: "Remaining", value: target - progress },
    ];
    setChartData(data);
  }, [progress, target]);

  const { updateGoal } = useStore();

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    updateGoal(goalId, { progress: newProgress });
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">
        {goalType} Progress
      </h2>
      <div className="flex items-center">
        <progress
          className="w-full"
          value={progress}
          max={target}
          onChange={handleProgressChange}
        />
        <span className="ml-2">{progress}/{target}</span>
      </div>
      {/* Add ChartJS or Recharts integration for a visual chart here */}
    </div>
  );
};

export default ProgressChart;