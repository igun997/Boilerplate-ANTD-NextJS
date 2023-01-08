import { NextPage } from 'next';

export interface LayoutConfig {
  layout?: string;
  title?: string;
  description?: string;
}

export type LayoutConfigWithNextPage = NextPage & LayoutConfig;
