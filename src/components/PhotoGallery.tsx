import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserAlbums,
  fetchAlbumPhotos,
  setSelectedAlbum,
  clearSelectedAlbum,
} from "@/store/slices/albumsSlice";
import type { Album, Photo } from "@/types";
import PhotoPlaceholder from "./PhotoPlaceholder";
import AlbumCover from "./AlbumCover";

interface PhotoGalleryProps {
  userId: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { albums, photos, selectedAlbum, loadingAlbums, loadingPhotos, error } =
    useAppSelector((state) => state.albums);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserAlbums(userId));
    }
  }, [dispatch, userId]);

  const handleAlbumClick = (album: Album) => {
    dispatch(setSelectedAlbum(album));
    dispatch(fetchAlbumPhotos(album.id));
  };

  const handleBackToAlbums = () => {
    dispatch(clearSelectedAlbum());
  };

  const handlePhotoClick = (photoIndex: number) => {
    setCurrentPhotoIndex(photoIndex);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setIsFullscreen(false);
  };

  // Get current album photos
  const currentAlbumPhotos = selectedAlbum
    ? photos[selectedAlbum.id] || []
    : [];

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? currentAlbumPhotos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === currentAlbumPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (event.key) {
        case "Escape":
          handleCloseLightbox();
          break;
        case "ArrowLeft":
          handlePrevPhoto();
          break;
        case "ArrowRight":
          handleNextPhoto();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxOpen, currentAlbumPhotos.length]);

  if (loadingAlbums) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading albums...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error loading albums: {error}
      </Alert>
    );
  }

  const currentPhoto = currentAlbumPhotos[currentPhotoIndex];

  return (
    <Box>
      {/* Albums Grid */}
      {!selectedAlbum && (
        <>
          <Typography variant="h6" gutterBottom>
            Photo Albums ({albums.length})
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 3,
              "& > *": {
                width: "100%",
                minHeight: { xs: 140, sm: 160, md: 180 },
              },
            }}
          >
            {albums.map((album: Album) => (
              <AlbumCover
                key={album.id}
                albumId={album.id}
                title={album.title}
                onClick={() => handleAlbumClick(album)}
              />
            ))}
          </Box>
        </>
      )}

      {/* Photos Grid */}
      {selectedAlbum && (
        <>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <IconButton onClick={handleBackToAlbums}>
              <ArrowBackIcon />
            </IconButton>
            <div>
              <Typography variant="h6">{selectedAlbum.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentAlbumPhotos.length} photos
              </Typography>
            </div>
          </Box>

          {loadingPhotos[selectedAlbum.id] && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                Loading photos...
              </Typography>
            </Box>
          )}

          {!loadingPhotos[selectedAlbum.id] && error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error loading photos: {error}
            </Alert>
          )}

          {!loadingPhotos[selectedAlbum.id] &&
            !error &&
            currentAlbumPhotos.length > 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                  },
                  gap: 1.5,
                  "& > *": {
                    aspectRatio: "1",
                    width: "100%",
                    height: "auto",
                  },
                }}
              >
                {currentAlbumPhotos.map((photo: Photo, index: number) => (
                  <PhotoPlaceholder
                    key={photo.id}
                    originalUrl={photo.thumbnailUrl}
                    photoId={photo.id}
                    title={photo.title}
                    isThumb={true}
                    onClick={() => handlePhotoClick(index)}
                  />
                ))}
              </Box>
            )}

          {!loadingPhotos[selectedAlbum.id] &&
            !error &&
            currentAlbumPhotos.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No photos found in this album.
                </Typography>
              </Box>
            )}
        </>
      )}

      {/* Lightbox Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        maxWidth={false}
        fullScreen={isFullscreen || isMobile}
        PaperProps={{
          sx: {
            bgcolor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(10px)",
            ...(isFullscreen && {
              m: 0,
              borderRadius: 0,
            }),
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            minHeight: isFullscreen ? "100vh" : { xs: "100vh", md: "80vh" },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseLightbox}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              zIndex: 10,
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Fullscreen Toggle (Desktop only) */}
          {!isMobile && (
            <IconButton
              onClick={toggleFullscreen}
              sx={{
                position: "absolute",
                top: 16,
                right: 72,
                color: "white",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                zIndex: 10,
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
              }}
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          )}

          {/* Navigation Buttons */}
          {currentAlbumPhotos.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevPhoto}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  zIndex: 10,
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              <IconButton
                onClick={handleNextPhoto}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  zIndex: 10,
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </>
          )}

          {/* Main Image */}
          {currentPhoto && (
            <PhotoPlaceholder
              originalUrl={currentPhoto.url}
              photoId={currentPhoto.id}
              title={currentPhoto.title}
              width={Math.min(800, window.innerWidth * 0.8)}
              height={Math.min(600, window.innerHeight * 0.6)}
              isThumb={false}
            />
          )}

          {/* Photo Info */}
          {currentPhoto && (
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                color: "white",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {currentPhoto.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Photo {currentPhotoIndex + 1} of {currentAlbumPhotos.length}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PhotoGallery;
