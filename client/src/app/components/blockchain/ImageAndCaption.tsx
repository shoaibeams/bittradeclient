import React from "react";

interface ImageAndCaptionProps {
  src: string;
  caption?: string;
  height?: string;
}

const ImageAndCaption: React.FC<ImageAndCaptionProps> = ({
  src,
  caption,
  height
}) => {
  return (
    <>
      <div className="paper-container scale-in-center">
        <img src={src} alt={caption} height={height} />
      </div>
    </>
  );
};

export default ImageAndCaption;
