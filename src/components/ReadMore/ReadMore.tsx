import { useState } from "react";
import { motion } from "framer-motion";
import P from "../Typography/P";

type ReadMoreProps = {
  id: string | number;
  text: string | null | undefined;
  amountOfWords?: number;
  className?: React.HTMLProps<HTMLAnchorElement>["className"];
};

export default function ReadMore({
  id,
  text,
  className,
  amountOfWords = 36,
}: ReadMoreProps) {
  if (!text) return null;

  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(" ");
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(" ")
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(" ");

  const handleKeyboard = (e: { code: string }) => {
    if (e.code === "Space" || e.code === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <P className={className}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <motion.span
            className={`${!isExpanded && "hidden"}`}
            aria-hidden={!isExpanded}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {" "}
            {endText}
          </motion.span>
          <span
            className="ml-2 font-medium text-white hover:underline"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id.toString()}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "show less" : "show more"}
          </span>
        </>
      )}
    </P>
  );
}
