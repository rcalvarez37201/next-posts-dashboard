import React from "react";
import { Box, Typography } from "@mui/material";
import { getPhotoColor, truncateText } from "@/utils";

interface AlbumCoverProps {
  albumId: number;
  title: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({
  albumId,
  title,
  width,
  height,
  onClick,
}) => {
  const hexColor = getPhotoColor(albumId);
  const backgroundColor = `#${hexColor}`;

  // Truncate title for better display
  const displayTitle = truncateText(title, 25);

  // Create responsive styles
  const sxProps = {
    backgroundColor: backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 2,
    cursor: onClick ? "pointer" : "default",
    borderRadius: 1,
    transition: "all 0.2s ease-in-out",
    "&:hover": onClick
      ? {
          transform: "translateY(-4px)",
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
        minHeight: 160,
      }),
  };

  return (
    <Box onClick={onClick} sx={sxProps}>
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: 600,
          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          lineHeight: 1.2,
          wordBreak: "break-word",
          mb: 1,
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
        }}
      >
        Album {albumId}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "white",
          fontWeight: 400,
          textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
          lineHeight: 1.3,
          wordBreak: "break-word",
          opacity: 0.9,
          fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.875rem" },
        }}
      >
        {displayTitle}
      </Typography>
    </Box>
  );
};

export default AlbumCover;
