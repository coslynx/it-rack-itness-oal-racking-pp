import { GoalType } from "@/types";

export const formatGoalTitle = (title: string, goalType: GoalType): string => {
  return `${goalType} - ${title}`;
};

export const formatGoalTarget = (target: number, goalType: GoalType): string => {
  if (goalType === "Distance Running") {
    return `${target} km`;
  }
  return `${target}`;
};

export const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const calculateProgress = (progress: number, target: number): number => {
  if (target === 0) {
    return 0;
  }
  return Math.round((progress / target) * 100);
};

export const getShareLink = (goalId: string): string => {
  return `https://www.fittrack.com/goal/${goalId}`;
};