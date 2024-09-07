import { Goal, GoalType } from "@/types";

export const validateGoal = (goal: Goal): string | null => {
  if (!goal.title) {
    return "Goal title is required";
  }

  if (!goal.target) {
    return "Goal target is required";
  }

  if (!goal.deadline) {
    return "Goal deadline is required";
  }

  if (!Object.values(GoalType).includes(goal.type)) {
    return "Invalid goal type";
  }

  if (goal.target <= 0) {
    return "Goal target must be greater than zero";
  }

  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  if (deadlineDate < today) {
    return "Goal deadline must be in the future";
  }

  return null;
};