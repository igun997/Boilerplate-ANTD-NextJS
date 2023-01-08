import { Resources } from '../../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageProps } from '../../../constants/slicer.constant';
import { RootResources } from '../../../types/services/root';

const initialState: Resources.PageTypes & {
  sliders?: RootResources.getSliderTypes.data[];
  isError?: boolean;
  header_image?: {
    data: {
      id: number;
      attributes: Resources.MediaAttributes;
    } | null;
  };
} = {
  description: '',
  haveSlider: false,
  keywords: '',
  sections: [],
  slug: '',
  title: '',
  sliders: [],
  isError: false,
};

export const pagePropsSlice = createSlice({
  name: PageProps,
  initialState,
  reducers: {
    setSliders: (state, action: PayloadAction<RootResources.getSliderTypes.data[]>) => {
      state.sliders = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSlug: (state, action: PayloadAction<string>) => {
      state.slug = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setKeywords: (state, action: PayloadAction<string>) => {
      state.keywords = action.payload;
    },
    setSections: (state, action: PayloadAction<Resources.SectionTypes[]>) => {
      state.sections = action.payload;
    },
    setHaveSlider: (state, action: PayloadAction<boolean>) => {
      state.haveSlider = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
      state.title = '';
      state.slug = '';
      state.description = '';
      state.keywords = '';
      state.sections = [];
      state.haveSlider = false;
      state.sliders = [];
    },
    setHeaderImage: (
      state,
      action: PayloadAction<{
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        } | null;
      }>,
    ) => {
      state.header_image = action.payload;
    },
    clearError: (state) => {
      state.isError = false;
    },
    clearPageProps: (state) => {
      state.title = '';
      state.slug = '';
      state.description = '';
      state.keywords = '';
      state.sections = [];
      state.haveSlider = false;
      state.sliders = [];
      state.isError = false;
      state.header_image = {
        data: null,
      };
    },
  },
});

export const {
  setSliders,
  setHaveSlider,
  setSlug,
  setDescription,
  setTitle,
  setKeywords,
  setSections,
  clearPageProps,
  setHeaderImage,
  setIsError,
  clearError,
} = pagePropsSlice.actions;
export default pagePropsSlice.reducer;
