import React from 'react';
import CSVReader from 'react-csv-reader';

const CSVUploadCSR = ({ onChange }: any) => {
  return (
    <CSVReader
      cssClass="react-csv-input"
      label="Unggah Data Penerima"
      onFileLoaded={(data) => {
        onChange(data);
      }}
    />
  );
};

export default CSVUploadCSR;
