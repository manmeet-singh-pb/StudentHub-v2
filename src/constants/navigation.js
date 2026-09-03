export const navigation = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Students",
    path: "/students",
    roles: ["teacher"],
  },
  {
    label: "My Profile",
    path: "/profile",
    roles: ["student"],
  },
];