interface AnimatedLinkProps {
  href: string;
  label: string;
  outsideDomain?: boolean;
}

export const AnimatedLink = ({
  href,
  label,
  outsideDomain = false,
}: AnimatedLinkProps) => {
  const animatedStyles =
    "bg-bottom-left bg-linear-to-r from-foreground to-foreground bg-no-repeat bg-size-[0%_2px] group-hover:bg-size-[100%_2px] transition-all duration-300 ease-out py-1";

  if (outsideDomain) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <span className={animatedStyles}>{label}</span>
      </a>
    );
  }

  return (
    <a href={href} className="block group">
      <span className={animatedStyles}>{label}</span>
    </a>
  );
};
