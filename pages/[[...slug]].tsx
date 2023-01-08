import { LayoutConfigWithNextPage } from '../configs/layout.config';
import React, { useEffect } from 'react';
import { Button, Col, Result, Row } from 'antd';
import { getPage, getPostBySlug, getSliders } from '../services/root';
import { RootResources } from '../types/services/root';
import { useAppDispatch, useAppSelector } from '../configs/hooks.config';
import LogoBlack from '../assets/images/black-192.png';
import {
  clearError,
  setDescription,
  setHaveSlider,
  setHeaderImage,
  setIsError,
  setKeywords,
  setSections,
  setSliders,
  setTitle,
} from '../redux/slices/pageProps';
import { useRouter } from 'next/router';
import RenderSection from '../components/Whitelabel';

export async function getServerSideProps({ resolvedUrl, query }: any) {
  const sliderRequest: RootResources.getSliderTypes.request = {
    fields: ['name'],
    populate: ['media'],
  };
  let _data: any = null;
  let _sliders: any = null;
  let _trimPath = resolvedUrl.replace('/', '');
  if (_trimPath === '') {
    _trimPath = 'home';
  }
  let isPost = false;
  if (query?.slug) {
    isPost = query.slug.includes('post');
  }
  if (isPost) {
    _trimPath = 'home';
  }

  try {
    _data = await getPage(_trimPath);
    _sliders = await getSliders(sliderRequest);
    if (_data.data.length === 0) {
      _data = null;
    }
  } catch (e) {
    _data = null;
    _sliders = null;
  }

  const isError = _data === null || _sliders === null;
  let pageSection = _data as RootResources.getPageTypes.response;
  let sliders = _sliders as RootResources.getSliderTypes.response;
  if (isPost) {
    let pageQuery: string = query.slug[2];
    const getPost = await getPostBySlug(pageQuery, true);
    if (getPost.data.length > 0) {
      const selectPost = getPost.data[0];
      pageSection.data = pageSection.data.map((e) => {
        if (selectPost?.attributes?.featured) {
          if (selectPost.attributes.featured.data !== null) {
            e.attributes.header_image = selectPost.attributes.featured;
            e.attributes.haveSlider = false;
          }
        }
        e.attributes.sections = [
          {
            component: 'post',
            layout: {
              xs: 24,
            },
            data: {
              title: selectPost.attributes.title,
              contents: selectPost.attributes.contents,
              featured: selectPost?.attributes?.featured?.data?.attributes?.url
                ? [selectPost?.attributes?.featured?.data?.attributes?.url]
                : [],
            },
          },
        ];
        return e;
      });
    }
  }
  return {
    props: {
      page: pageSection,
      sliders: sliders,
      isError: isError,
    },
  };
}

const Home: LayoutConfigWithNextPage = (props: any) => {
  const router = useRouter();
  const [pageError, setPageError] = React.useState<boolean>(false);
  const pages = useAppSelector((state) => state.pageProps);
  const dispatch = useAppDispatch();
  const loadSliders = (res: RootResources.getSliderTypes.response) => {
    const sliders = res.data.map((slider) => slider.attributes);
    dispatch(setSliders(sliders));
  };
  const loadPage = (res: RootResources.getPageTypes.response) => {
    const isPage = res.data.length > 0;
    if (isPage) {
      const page = res.data[0].attributes;
      dispatch(setTitle(page?.title ?? ''));
      dispatch(setDescription(page?.description ?? ''));
      dispatch(setKeywords(page?.keywords ?? ''));
      dispatch(setSections(page?.sections ?? []));
      dispatch(setHaveSlider(page?.haveSlider ?? false));
      dispatch(setHeaderImage(page?.header_image));
      setPageError(false);
      dispatch(clearError());
    }
  };
  useEffect(() => {
    if (props) {
      if (props?.isError) {
        dispatch(setIsError(true));
        setPageError(true);
      }
      if (props?.isError === false) {
        if (props?.page) {
          loadPage(props?.page);
        }
        if (props?.sliders) {
          loadSliders(props?.sliders);
        }
      }
    }
  }, [props]);
  if (pageError) {
    return (
      <Result
        icon={<img src={LogoBlack.src} alt="logo" />}
        title="Halaman tidak ditemukan"
        subTitle="Maaf, halaman yang anda cari tidak ditemukan"
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Kembali ke Beranda
          </Button>
        }
      />
    );
  } else {
    return (
      <Row>
        {pages?.sections &&
          pages?.sections?.map((section, index) => (
            <Col key={index} {...section.layout}>
              <RenderSection {...section} />
            </Col>
          ))}
      </Row>
    );
  }
};
Home.layout = 'base';
Home.title = 'Cosmic Visual';
Home.description = 'Moment Without Words';

export default Home;
