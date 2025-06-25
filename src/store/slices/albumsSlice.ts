import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { Album, Photo } from "@/types";

interface AlbumsState {
  albums: Album[];
  photos: { [albumId: number]: Photo[] };
  loadingAlbums: boolean;
  loadingPhotos: { [albumId: number]: boolean };
  error: string | null;
  selectedAlbum: Album | null;
}

const initialState: AlbumsState = {
  albums: [],
  photos: {},
  loadingAlbums: false,
  loadingPhotos: {},
  error: null,
  selectedAlbum: null,
};

/**
 * Async thunk to fetch albums for a specific user
 */
export const fetchUserAlbums = createAsyncThunk(
  "albums/fetchUserAlbums",
  async (userId: number) => {
    const response = await api.get(`/users/${userId}/albums`);
    return response.data;
  }
);

/**
 * Async thunk to fetch photos for a specific album
 */
export const fetchAlbumPhotos = createAsyncThunk(
  "albums/fetchAlbumPhotos",
  async (albumId: number) => {
    const response = await api.get(`/albums/${albumId}/photos`);
    return { albumId, photos: response.data };
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    clearAlbums: (state) => {
      state.albums = [];
      state.photos = {};
      state.error = null;
      state.loadingAlbums = false;
      state.loadingPhotos = {};
      state.selectedAlbum = null;
    },
    setSelectedAlbum: (state, action) => {
      state.selectedAlbum = action.payload;
    },
    clearSelectedAlbum: (state) => {
      state.selectedAlbum = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserAlbums
      .addCase(fetchUserAlbums.pending, (state) => {
        state.loadingAlbums = true;
        state.error = null;
      })
      .addCase(fetchUserAlbums.fulfilled, (state, action) => {
        state.loadingAlbums = false;
        state.albums = action.payload;
      })
      .addCase(fetchUserAlbums.rejected, (state, action) => {
        state.loadingAlbums = false;
        state.error = action.error.message || "Failed to load albums";
      })
      // fetchAlbumPhotos
      .addCase(fetchAlbumPhotos.pending, (state, action) => {
        const albumId = action.meta.arg;
        state.loadingPhotos[albumId] = true;
        state.error = null;
      })
      .addCase(fetchAlbumPhotos.fulfilled, (state, action) => {
        const { albumId, photos } = action.payload;
        state.loadingPhotos[albumId] = false;
        state.photos[albumId] = photos;
      })
      .addCase(fetchAlbumPhotos.rejected, (state, action) => {
        const albumId = action.meta.arg;
        state.loadingPhotos[albumId] = false;
        state.error = action.error.message || "Failed to load photos";
      });
  },
});

export const { clearAlbums, setSelectedAlbum, clearSelectedAlbum } =
  albumsSlice.actions;
export default albumsSlice.reducer;
