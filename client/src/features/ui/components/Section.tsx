import classNames, { ArgumentArray } from "classnames";

type Props = {
  classname?: ArgumentArray;
} & React.PropsWithChildren;

const Section = ({ classname, children }: Props) => {
  return (
    <div className={classNames("px-4 md:px-12 py-8 md:py-12", classname)}>
      {children}
    </div>
  );
};

export default Section;
