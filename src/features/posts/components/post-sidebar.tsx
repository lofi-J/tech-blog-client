"use client";

import { motion } from "framer-motion";

type PostSidebarProps = {
  title: string;
  // tags: Tag[];
};

export const PostSidebar = ({ title }: PostSidebarProps) => {
  return (
    <motion.div>
      <div className="flex flex-col gap-4">
        <h1>{"사이드바"}</h1>
      </div>
    </motion.div>
  );
};
