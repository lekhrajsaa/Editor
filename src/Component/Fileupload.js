import React, { useRef, useState } from 'react';
// import axios from 'axios';
import styled from 'styled-components';
// import Cookies from 'universal-cookie';

// import { API_PREFIX } from '../../../../constants/constants';
// import UploadLogoIcon from '../../../../pinak-ui/svg/upload-logo.svg';
import UploadLogoIcon from '../Icons/upload-logo.svg';

const CompanyLogoWrapper = styled.img`
  max-height: 100px;
  max-width: 100px;
`;

const FileUpload = ({ companyLogoUrl, setCompanyLogoUrl }) => {
  const [logo, setLogo] = useState();
  const el = useRef();

  const handleChange = e => {
    const file = e.target.files[0];
    setLogo(file);
    uploadFile(file);
    console.log(file);
  };

  const uploadFile = async file => {
    // const cookies = new Cookies();
    const formData = new FormData();

    // try {
    //   formData.append('file', file);
    //   axios
    //     .post(`${API_PREFIX}/api/jd/upload_logo`, formData, {
    //       headers: {
    //         'content-type': 'multipart/form-data',
    //         Authorization: 'Bearer ' + cookies.get('auth').token,
    //       },
    //     })
    //     .then(res => {
    //       setLogo(res.data.url);
    //       setCompanyLogoUrl(res.data.url);
    //     })
    //     .catch(err => console.log(err));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div
      style={{ display: 'inline-block' }}
      onClick={() => document.getElementById('file').click()}
    >
      {/* {companyLogoUrl || logo ? (
        <CompanyLogoWrapper src={companyLogoUrl || logo} />
      ) : (
        <UploadLogoIcon />
      )} */}
      <CompanyLogoWrapper
        src={logo ? URL.createObjectURL(logo) : UploadLogoIcon}
      />

      <input
        id="file"
        type="file"
        style={{ display: 'none' }}
        ref={el}
        className="form-control"
        onChange={handleChange}
        accept="image/*;capture=camera"
      />
    </div>
  );
};
export default FileUpload;
