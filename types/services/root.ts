import { Resources } from '../types';

export namespace RootResources {
  export namespace getSliderTypes {
    // Defined Sliders Data
    export type data = {
      name: string;
      description: string;
      media?: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        };
      };
    };
    export type _response = {
      id: number;
      attributes: data;
    };
    //General Output
    export type request = Resources.Requests;
    export type response = {
      data: _response[];
      meta: {
        pagination: Resources.PaginationTypes;
      };
    };
  }
  export namespace getPageTypes {
    export type data = Resources.PageTypes & {
      header_image: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        } | null;
      };
    };
    export type _response = {
      id: number;
      attributes: data;
    };
    //General Output
    export type request = Resources.Requests;
    export type response = {
      data: _response[];
      meta: {
        pagination: Resources.PaginationTypes;
      };
    };
  }
  export namespace getPostTypes {
    // Defined Sliders Data
    export type data = {
      title: string;
      category: string;
      type: string;
      slug: string;
      description: string;
      contents: string;
      featured?: {
        data: {
          id: number;
          attributes: Resources.MediaAttributes;
        };
      };
    };
    export type _response = {
      id: number;
      attributes: data;
    };
    //General Output
    export type request = Resources.Requests;
    export type response = {
      data: _response[];
      meta: {
        pagination: Resources.PaginationTypes;
      };
    };
  }
}
