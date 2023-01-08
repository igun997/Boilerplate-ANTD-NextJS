import { initializeHttp } from '../../configs/http.config';
import { API_HOST } from '../../constants/http.constant';
import { RootResources } from '../../types/services/root';

const http = initializeHttp(API_HOST ?? '');
/**
 * Get Slider Types
 * @param  RootResources.getSliderTypes.request
 * @returns RootResources.getSliderTypes.response
 */
export const getSliders = (params: RootResources.getSliderTypes.request) => {
  return http
    .get('/sliders', { params })
    .then((response) => response.data as RootResources.getSliderTypes.response)
    .catch((error) => {
      throw error;
    });
};

/**
 * Get Page Data
 * @param  RootResources.getPageTypes.request
 * @returns RootResources.getPageTypes.response
 */

export const getPage = (params: any) => {
  return http
    .get('/pages?populate=*&filters[slug][$eq]=' + params)
    .then((response) => response.data as RootResources.getPageTypes.response)
    .catch((error) => {
      throw error;
    });
};
/**
 * Get Post Data By Slug
 * @param slug
 * @param witContent
 * @param pageSize
 * @returns RootResources.getPostTypes.response
 */
export const getPostBySlug = (slug: string, witContent: boolean, pageSize?: number) => {
  return http
    .get(
      '/posts?populate=*&filters[slug][$eq]=' +
        slug +
        `${
          witContent
            ? '&fields[]=contents&fields[]=title&fields[]=slug&fields[]=type&fields[]=category'
            : '&fields[]=title&fields[]=slug&fields[]=type&fields[]=category'
        }` +
        `${pageSize !== undefined ? '&pagination[pageSize]=' + pageSize : ''}`,
    )
    .then((response) => response.data as RootResources.getPostTypes.response)
    .catch((error) => {
      throw error;
    });
};
/**
 * Get Post Data By Type
 * @param type
 * @param witContent
 * @param pageSize
 * @returns RootResources.getPostTypes.response
 */
export const getPostByType = (type: string, witContent: boolean, pageSize?: number) => {
  return http
    .get(
      '/posts?populate=*&filters[type][$eq]=' +
        type +
        `${
          witContent
            ? '&fields[]=contents&fields[]=title&fields[]=slug&fields[]=type&fields[]=category'
            : '&fields[]=title&fields[]=slug&fields[]=type&fields[]=category'
        }` +
        `${pageSize !== undefined ? '&pagination[pageSize]=' + pageSize : ''}`,
    )
    .then((response) => response.data as RootResources.getPostTypes.response)
    .catch((error) => {
      throw error;
    });
};
/**
 * Get Post Data By Slug and Type
 * @param type
 * @param category
 * @param witContent
 * @param pageSize
 * @returns RootResources.getPostTypes.response
 */
export const getPostBySlugAndType = (
  type: string,
  category: string,
  witContent: boolean,
  pageSize?: number,
) => {
  return http
    .get(
      `/posts?populate=*&filters[type][$eq]=${type}&filters[category][$eq]=${category}` +
        `${
          witContent
            ? '&fields[]=contents&fields[]=title&fields[]=slug&fields[]=type&fields[]=category'
            : '&fields[]=title&fields[]=slug&fields[]=type&fields[]=category'
        }` +
        `${pageSize !== undefined ? '&pagination[pageSize]=' + pageSize : ''}`,
    )
    .then((response) => response.data as RootResources.getPostTypes.response)
    .catch((error) => {
      throw error;
    });
};
