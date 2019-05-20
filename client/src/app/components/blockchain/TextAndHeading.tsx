import React from "react";

interface TextAndHeadingProps {
  heading: string;
  para: string;
  children?: JSX.Element[] | JSX.Element;
}

const TextAndHeading: React.FC<TextAndHeadingProps> = ({
  heading,
  para,

  children
}) => {
  return (
    <div className="paper-container">
      <h1 className="heading-big">{heading}</h1>
      {children}
      <p className="text-medium">{para}</p>
    </div>
  );
};

export default TextAndHeading;
