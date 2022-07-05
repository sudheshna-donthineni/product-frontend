import { Icon } from "@iconify/react";
import React from "react";

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "users",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "finance",
    icon: getIcon("eva:shopping-bag-fill"),
    nested: true,
    children: [
      {
        title: "fee collection",
        icon: getIcon("eva:people-fill"),
      },
    ],
  },
  {
    title: "inventory",
    icon: getIcon("eva:file-text-fill"),
  },
];

export default navConfig;
