import React from "react";
import { Box, Typography } from "@mui/material";
import { extractColorFromPhotoUrl, truncateText } from "@/utils";

interface PhotoPlaceholderProps {
  originalUrl: string;
  photoId: number;
  title: string;
  width?: number;
  height?: number;
  isThumb?: boolean;
  onClick?: () => void;
}

const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  originalUrl,
  photoId,
  title,
  width,
  height,
  isThumb = false,
  onClick,
}) => {
  const hexColor = extractColorFromPhotoUrl(originalUrl);
  const backgroundColor = `#${hexColor}`;

  // Truncate title for better display
  const maxLength = isThumb ? 15 : 30;
  const displayTitle = truncateText(title, maxLength);

  // Create responsive styles
  const sxProps = {
    backgroundColor: backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: isThumb ? 0.5 : 2,
    cursor: onClick ? "pointer" : "default",
    borderRadius: 1,
    transition: "all 0.2s ease-in-out",
    "&:hover": onClick
      ? {
          transform: "scale(1.05)",
          boxShadow: 3,
        }
      : {},
    // Use explicit dimensions if provided, otherwise be responsive
    ...(width && { width: width }),
    ...(height && { height: height }),
    // If no dimensions provided, make it responsive to container
    ...(!width &&
      !height && {
        width: "100%",
        height: "100%",
        minHeight: isThumb ? 120 : 300,
        aspectRatio: isThumb ? "1" : "auto",
      }),
  };

  return (
    <Box onClick={onClick} sx={sxProps}>
      <Typography
        variant={isThumb ? "caption" : "h6"}
        sx={{
          color: "white",
          fontWeight: 600,
          textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
          lineHeight: 1.2,
          wordBreak: "break-word",
          fontSize: isThumb
            ? { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" }
            : "1.1rem",
        }}
      >
        Photo {photoId}
      </Typography>
      <Typography
        variant={isThumb ? "caption" : "body1"}
        sx={{
          color: "white",
          fontWeight: 400,
          textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
          lineHeight: 1.1,
          mt: 0.5,
          wordBreak: "break-word",
          fontSize: isThumb
            ? { xs: "0.5rem", sm: "0.6rem", md: "0.65rem" }
            : "0.9rem",
          opacity: 0.95,
        }}
      >
        {displayTitle}
      </Typography>
    </Box>
  );
};

export default PhotoPlaceholder;
