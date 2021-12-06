import React from 'react';

import FileUpload from './Fileupload';
import { CompayDetails } from './jdStyle';
const JDHeader = ({
  companyName,
  companyLogoUrl,
  companyLocation,
  setCompanyLogoUrl,
}) => {
  return (
    <section
      className="row  mb-5"
      style={{
        justifyContent: 'space-between',
      }}
    >
      <div className="col-lg-1 col-1">
        <FileUpload
          companyLogoUrl={companyLogoUrl}
          setCompanyLogoUrl={setCompanyLogoUrl}
        />
      </div>
      <div
        className="col-lg-4 col-4 pl-3"
        style={{
          textAlign: 'right',
        }}
      >
        <CompayDetails
          id="company-name"
          className="pt-4"
          contentEditable="true"
          data-placeholder="Add Company Name"
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{
            __html: companyName,
          }}
        />

        <CompayDetails
          id="company-location"
          contentEditable="true"
          className="comp-location"
          data-placeholder="Add Company Location"
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: companyLocation }}
        />
      </div>
    </section>
  );
};

export default JDHeader;
