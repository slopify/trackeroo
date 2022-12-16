import React, { FC } from 'react';

interface ISVGIconComponentProps {
    color?: string;
  }

const CancelIcon: FC<ISVGIconComponentProps> = ({ color = 'black' }) => {
  return (
    <svg style={{cursor: 'pointer'}}width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.4141 6.00001L11.7071 1.70701C12.0981 1.31601 12.0981 0.684006 11.7071 0.293006C11.3161 -0.0979941 10.6841 -0.0979941 10.2931 0.293006L6.0001 4.58601L1.7071 0.293006C1.3161 -0.0979941 0.684097 -0.0979941 0.293097 0.293006C-0.0979026 0.684006 -0.0979026 1.31601 0.293097 1.70701L4.5861 6.00001L0.293097 10.293C-0.0979026 10.684 -0.0979026 11.316 0.293097 11.707C0.488097 11.902 0.744097 12 1.0001 12C1.2561 12 1.5121 11.902 1.7071 11.707L6.0001 7.41401L10.2931 11.707C10.4881 11.902 10.7441 12 11.0001 12C11.2561 12 11.5121 11.902 11.7071 11.707C12.0981 11.316 12.0981 10.684 11.7071 10.293L7.4141 6.00001Z"
        fill={color}
      />
    </svg>
  );
};

export default CancelIcon;