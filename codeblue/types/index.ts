export type Paths = "home" | "challenges" | "ranking" | "progress" | "profile";

export type languages =
  | "JavaScript"  
  | "Python"
  | "Csharp"
 ;

export const ApplicationPaths = {
  START: "/",
  LOGIN: "/login",
  CREATE: "/create",
  HOME: "/home",
  CHALLENGES: "/challenges",
  RANKING: "/ranking",
  PROGRESS: "/progress",
  PROFILE: "/profile",
  CHALLENGE: "/challenge/[id]",
};
