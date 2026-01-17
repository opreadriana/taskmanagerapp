export const PRIORITY_LEVELS = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
} as const;

export const PRIORITY_ORDER = {
  [PRIORITY_LEVELS.HIGH]: 0,
  [PRIORITY_LEVELS.MEDIUM]: 1,
  [PRIORITY_LEVELS.LOW]: 2,
};

export const BUTTON_TEXT = {
  ADD: "Add",
  GO_BACK_HOME: "Go Back Home",
} as const;

export const MESSAGES = {
  NO_TASKS: "No tasks found. Try adding a task above!",
  LOADING: "Loading tasks...",
  PLACEHOLDER: "Add a new task...",
} as const;
