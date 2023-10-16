import { FC, ReactNode, useRef } from "react";
import { CSSTransition } from "react-transition-group";

type Props = {
  inState: boolean;
  children: ReactNode;
  className?: string;
};

const classNames = {
  appear: "opacity-0",
  appearActive: "transition-opacity duration-300 opacity-100",
  enter: "opacity-0",
  enterActive: "transition-opacity duration-300 opacity-100",
  // exit: "opacity-100",
  // exitActive: "transition-opacity duration-300 opacity-0",
  // exitDone: "transition-opacity duration-300 opacity-0",
};

export const Fade: FC<Props> = ({ inState, children, className }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      appear={true}
      nodeRef={nodeRef}
      in={inState}
      classNames={classNames}
      timeout={300}
    >
      <div className={className} ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};
