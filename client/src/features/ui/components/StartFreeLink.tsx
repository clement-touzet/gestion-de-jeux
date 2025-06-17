import { Link } from "@tanstack/react-router";
import { twMerge, type ClassNameValue } from "tailwind-merge";

type Props = {
  className?: ClassNameValue;
};

const StartFreeLink = ({ className }: Props) => {
  const mergedClassName = twMerge("btn", className);
  return (
    <Link to="/register" className={mergedClassName}>
      Démarrer gratuitement
    </Link>
  );
};

export default StartFreeLink;
