import React from 'react';

export const UploadedFilesList = ({ uploadedFilesArr }: any) => {
  const units = [
    'байт',
    'кб',
    'мб',
    'гб',
  ];

  function niceBytes(x: any) {
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }
  return uploadedFilesArr.map((file: any) => {
    return (
      <>
        <li key={file.name}>
          <p>{file.name.split('.')[0]}</p>
          <p>{niceBytes(+file.size)}</p>
          <p>
            {file.type === 'application/json'
              ? 'json'
              : file.type ===
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              ? 'xlsx'
              : 'Неверный формат файла'}
          </p>
          <p>{file.lastModifiedDate.toLocaleDateString()}</p>
        </li>
        {/* <button onClick={deleteFile}>X</button> */}
      </>
    );
  });
};
