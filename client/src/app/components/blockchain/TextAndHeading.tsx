import React from "react";

interface TextAndHeadingProps {
  heading: string;
  para: string;
  headingStyle?: object;
  paraStyle?: object;
  children?: JSX.Element[] | JSX.Element;
}

const TextAndHeading: React.FC<TextAndHeadingProps> = ({
  heading,
  para,
  headingStyle,
  paraStyle,
  children
}) => {
  return (
    <div className="paper-container">
      <h2 style={{ ...headingStyle }}>{heading}</h2>
      {children}
      <p style={{ ...paraStyle }}>{para}</p>
    </div>
  );
};

export default TextAndHeading;
