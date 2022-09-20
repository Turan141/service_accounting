import React, { useState } from 'react';
import { ItemFromDB } from './ItemFromDB';

export const ItemListFromDB = ({ modifiedFilesFromCloud }: any) => {

    modifiedFilesFromCloud?.sort((a: any, b: any) =>
    a.useInImport > b.useInImport ? 1 : b.useInImport > a.useInImport ? -1 : 0,
  );

  return modifiedFilesFromCloud.map((elem: any) => {
    return (
      <ItemFromDB
        artefactMasterCode={elem.artefactMasterCode}
        useInImport={elem.useInImport}
        key={elem.id}
      />
    );
  });
};
