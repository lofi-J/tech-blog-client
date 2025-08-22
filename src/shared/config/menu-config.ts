import { Url } from "next/dist/shared/lib/router/router";

export type Menu = {
  label: string;
  href: Url;
};

export const menuConfig: Menu[] = [
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "Toy Projects",
    href: "/toys",
  },
];
