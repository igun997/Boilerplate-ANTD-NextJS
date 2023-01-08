import { useState } from 'react';
import { UploadProps } from 'antd';
import axios from 'axios';
import { runError } from '../../configs/http.config';

const useUpload: ({ url, headers }: { url: any; headers: any; type: any }) => {
  percentUpload: number;
  uploaded: any;
  loading: boolean;
  props: UploadProps<any>;
  isError: boolean;
  resetAll: () => void;
} = ({ url, headers, type }) => {
  const [percentUpload, setPercentUpload] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<any>(null);
  const [isError, setIsError] = useState<any>(null);
  const resetAll = () => {
    setPercentUpload(0);
    setUploaded(null);
    setLoading(false);
    setIsError(null);
  };
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    fileList: [],
    customRequest: (options) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', options.file);
      formData.append('type', type);
      //upload with percent progress on axios
      axios
        .post(url, formData, {
          headers: headers,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setPercentUpload(percentCompleted);
          },
        })
        .then((res) => {
          setUploaded(res.data);
          setPercentUpload(0);
        })
        .catch((err) => {
          setIsError(err);
          setPercentUpload(0);
          runError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };
  return {
    props,
    percentUpload,
    loading,
    uploaded,
    isError,
    resetAll,
  };
};

export default useUpload;
