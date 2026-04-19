import { motion, useReducedMotion, type Variants } from "motion/react";

export type AnimationState =
  | "moon-idle"
  | "sun-idle"
  | "moon-to-sun"
  | "sun-to-moon";

interface SunMoonIconProps {
  animationState: AnimationState;
  onAnimationComplete: (variant: string) => void;
  className?: string;
}

const SUN_BODY_PATH =
  "M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z";
const MOON_BODY_PATH =
  "M20 10C20 15.5228 15.5228 20 10 20C4.47716 20 0 15.5228 0 10C0 4.47716 4.47716 0 10 0C6.54126 10.5625 11.6717 14.2713 20 10Z";

const bodyVariants = {
  "moon-idle": {
    d: MOON_BODY_PATH,
    rotate: 0,
    y: 2,
    x: 2,
    fill: "#456786",
    stroke: "#00a6f4",
    strokeWidth: 2,
  },
  "moon-to-sun": {
    d: SUN_BODY_PATH,
    rotate: 180,
    y: 0,
    x: 0,
    fill: "#fcc800",
    stroke: "#d08700",
    strokeWidth: 2,
  },
  "sun-idle": {
    d: SUN_BODY_PATH,
    rotate: 180,
    y: 0,
    x: 0,
    fill: "#fcc800",
    stroke: "#d08700",
    strokeWidth: 2,
  },
  "sun-to-moon": {
    d: MOON_BODY_PATH,
    rotate: 0,
    y: 2,
    x: 2,
    fill: "#456786",
    stroke: "#00a6f4",
    strokeWidth: 2,
  },
};

const sunRaysContainerVariants = {
  "moon-idle": {
    transition: { staggerChildren: 0.01, staggerDirection: -1 as const },
  },
  "sun-idle": {
    transition: { staggerChildren: 0.05 },
  },
  "moon-to-sun": {
    transition: { staggerChildren: 0.05 },
  },
  "sun-to-moon": {
    transition: { staggerChildren: 0.01, staggerDirection: -1 as const },
  },
};

const sunRayVariants = {
  "moon-idle": { opacity: 0, transition: { duration: 0 } },
  "sun-idle": { opacity: 1, transition: { duration: 0.15 } },
  "moon-to-sun": { opacity: 1, transition: { duration: 0.15 } },
  "sun-to-moon": { opacity: 0, transition: { duration: 0 } },
};

const smallStarVariants = {
  "moon-idle": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0.2, delay: 0.1 },
  },
  "sun-idle": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 0.1,
    transition: { duration: 0.1 },
  },
  "moon-to-sun": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 0.1,
    transition: { duration: 0.1 },
  },
  "sun-to-moon": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0.2, delay: 0.1 },
  },
};

const bigStarVariants = {
  "moon-idle": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0.2, delay: 0.15 },
  },
  "sun-idle": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 0.1,
    transition: { duration: 0.1 },
  },
  "moon-to-sun": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 0.1,
    transition: { duration: 0.1 },
  },
  "sun-to-moon": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0.2, delay: 0.15 },
  },
};

const svgReducedVariants: Variants = {
  "moon-idle": { opacity: 1 },
  "sun-idle": { opacity: 1 },
  "moon-to-sun": {
    opacity: [0, 1],
    transition: { duration: 0.3, ease: "easeIn" },
  },
  "sun-to-moon": {
    opacity: [0, 1],
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const reducedBodyVariants = {
  "moon-idle": {
    d: MOON_BODY_PATH,
    rotate: 0,
    y: 2,
    x: 2,
    fill: "#456786",
    stroke: "#00a6f4",
    strokeWidth: 2,
    transition: { duration: 0 },
  },
  "moon-to-sun": {
    d: SUN_BODY_PATH,
    rotate: 0,
    y: 0,
    x: 0,
    fill: "#fcc800",
    stroke: "#d08700",
    strokeWidth: 2,
    transition: { duration: 0 },
  },
  "sun-idle": {
    d: SUN_BODY_PATH,
    rotate: 0,
    y: 0,
    x: 0,
    fill: "#fcc800",
    stroke: "#d08700",
    strokeWidth: 2,
    transition: { duration: 0 },
  },
  "sun-to-moon": {
    d: MOON_BODY_PATH,
    rotate: 0,
    y: 2,
    x: 2,
    fill: "#456786",
    stroke: "#00a6f4",
    strokeWidth: 2,
    transition: { duration: 0 },
  },
};

const reducedSunRaysContainerVariants = {
  "moon-idle": { transition: { staggerChildren: 0 } },
  "sun-idle": { transition: { staggerChildren: 0 } },
  "moon-to-sun": { transition: { staggerChildren: 0 } },
  "sun-to-moon": { transition: { staggerChildren: 0 } },
};

const reducedSunRayVariants = {
  "moon-idle": { opacity: 0, transition: { duration: 0 } },
  "sun-idle": { opacity: 1, transition: { duration: 0 } },
  "moon-to-sun": { opacity: 1, transition: { duration: 0 } },
  "sun-to-moon": { opacity: 0, transition: { duration: 0 } },
};

const reducedSmallStarVariants = {
  "moon-idle": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
  "sun-idle": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
  "moon-to-sun": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
  "sun-to-moon": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
};

const reducedBigStarVariants = {
  "moon-idle": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
  "sun-idle": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
  "moon-to-sun": {
    opacity: 0,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
  "sun-to-moon": {
    opacity: 1,
    x: 2,
    y: -2,
    scale: 1,
    transition: { duration: 0 },
  },
};

export const SunMoonIcon = ({
  animationState,
  onAnimationComplete,
  className = "size-12",
}: SunMoonIconProps) => {
  const prefersReducedMotion = useReducedMotion();

  const activeBodyVariants = prefersReducedMotion
    ? reducedBodyVariants
    : bodyVariants;
  const activeRaysContainerVariants = prefersReducedMotion
    ? reducedSunRaysContainerVariants
    : sunRaysContainerVariants;
  const activeRayVariants = prefersReducedMotion
    ? reducedSunRayVariants
    : sunRayVariants;
  const activeSmallStarVariants = prefersReducedMotion
    ? reducedSmallStarVariants
    : smallStarVariants;
  const activeBigStarVariants = prefersReducedMotion
    ? reducedBigStarVariants
    : bigStarVariants;

  return (
    <motion.svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      initial={false}
      animate={animationState}
      variants={prefersReducedMotion ? svgReducedVariants : undefined}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.path
        variants={activeBodyVariants}
        style={{ transformOrigin: "12px 12px" }}
      />

      <g clipPath="url(#clip1_10_93)">
        <motion.g variants={activeRaysContainerVariants}>
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 1.75C12.5 1.33579 12.1642 1 11.75 1C11.3358 1 11 1.33579 11 1.75V3.75C11 4.16421 11.3358 4.5 11.75 4.5C12.1642 4.5 12.5 4.16421 12.5 3.75V1.75Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.0814 3.46609C20.3609 3.77179 20.3396 4.24619 20.0339 4.52569L17.8119 6.55727C17.5062 6.83677 17.0318 6.81553 16.7523 6.50983C16.4728 6.20413 16.494 5.72974 16.7997 5.45024L19.0218 3.41865C19.3275 3.13915 19.8018 3.16039 20.0814 3.46609Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.75 11C19.3358 11 19 11.3358 19 11.75C19 12.1642 19.3358 12.5 19.75 12.5H21.75C22.1642 12.5 22.5 12.1642 22.5 11.75C22.5 11.3358 22.1642 11 21.75 11H19.75Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7755 16.7752C17.0684 16.4823 17.5433 16.4823 17.8362 16.7752L20.0582 18.9975C20.3511 19.2904 20.351 19.7653 20.0581 20.0582C19.7652 20.3511 19.2903 20.351 18.9975 20.0581L16.7755 17.8358C16.4826 17.5429 16.4826 17.0681 16.7755 16.7752Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.75 19C12.1642 19 12.5 19.3358 12.5 19.75V21.75C12.5 22.1642 12.1642 22.5 11.75 22.5C11.3358 22.5 11 22.1642 11 21.75V19.75C11 19.3358 11.3358 19 11.75 19Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.72467 16.7753C7.01756 17.0682 7.01756 17.5431 6.72467 17.836L4.50244 20.0582C4.20955 20.3511 3.73468 20.3511 3.44178 20.0582C3.14889 19.7653 3.14889 19.2904 3.44178 18.9976L5.66401 16.7753C5.9569 16.4824 6.43177 16.4824 6.72467 16.7753Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.75 11C1.33579 11 1 11.3358 1 11.75C1 12.1642 1.33579 12.5 1.75 12.5H3.75C4.16421 12.5 4.5 12.1642 4.5 11.75C4.5 11.3358 4.16421 11 3.75 11H1.75Z"
            fill="#d08700"
          />
          <motion.path
            variants={activeRayVariants}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.41865 3.46609C3.69815 3.16039 4.17255 3.13915 4.47825 3.41865L6.70026 5.45024C7.00596 5.72974 7.0272 6.20413 6.7477 6.50983C6.4682 6.81553 5.9938 6.83677 5.6881 6.55727L3.46609 4.52569C3.16039 4.24619 3.13915 3.77179 3.41865 3.46609Z"
            fill="#d08700"
          />
        </motion.g>
      </g>

      <motion.path
        variants={activeBigStarVariants}
        d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z"
        fill="white"
        stroke="#224f72"
        strokeWidth="1"
      />

      <motion.path
        variants={activeSmallStarVariants}
        d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z"
        fill="white"
        stroke="#224f72"
        strokeWidth="1"
      />
    </motion.svg>
  );
};
