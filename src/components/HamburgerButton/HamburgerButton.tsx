import { motion } from "motion/react";
import { type Dispatch, type SetStateAction } from "react";

export const HamburgerButton = ({
  menuOpen,
  onClick,
}: {
  menuOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) => {
  const animationState = menuOpen ? "toX" : "toMenu";

  const topLineVariants = {
    menu: { y: 0, rotate: 0 },
    toX: {
      y: [0, -2, 6, 6, 6],
      rotate: [0, 0, 0, 60, 45],
      transition: { duration: 0.5 },
    },
    toMenu: {
      y: [6, 6, 6, -2, 0],
      rotate: [45, 60, 0, 0, 0],
      transition: { duration: 0.5 },
    },
  };

  const middleLineVariants = {
    menu: { y: 0, rotate: 0 },
    toX: {
      opacity: [1, 1, 0, 0],
      transition: { duration: 0.5 },
    },
    toMenu: {
      opacity: [0, 0, 1, 1],
      transition: { duration: 0.5 },
    },
  };

  const bottomLineVariants = {
    menu: { y: 0, rotate: 0 },
    toX: {
      y: [0, 2, -6, -6, -6],
      rotate: [0, 0, 0, -60, -45],
      transition: { duration: 0.5 },
    },
    toMenu: {
      y: [-6, -6, -6, 2, 0],
      rotate: [-45, -60, 0, 0, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <button onClick={() => onClick(!menuOpen)} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M4 6h16"
          variants={topLineVariants}
          initial={false}
          animate={animationState}
        />
        <motion.path
          d="M4 12h16"
          variants={middleLineVariants}
          initial={false}
          animate={animationState}
        />
        <motion.path
          d="M4 18h16"
          variants={bottomLineVariants}
          initial={false}
          animate={animationState}
        />
      </svg>
    </button>
  );
};
