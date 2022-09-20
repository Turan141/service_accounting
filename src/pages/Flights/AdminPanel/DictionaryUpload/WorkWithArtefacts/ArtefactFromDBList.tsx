import React from 'react';
import { ArtefactItem } from './ArtefactItem';

export const ArtefactFromDBList = ({ artefacts }: any) => {
  return artefacts.length && artefacts?.map((elem: any) => {
    return (
      <ArtefactItem
        key={elem?.params}
        tag={elem?.tag}
        referenceMasterCode={elem?.referenceMasterCode}
        url={elem?.url}
        artefactMasterCode={elem?.artefactMasterCode}
        getUrl={elem?.getUrl}
        clearUrl={elem?.clearUrl}
      />
    );
  });
};
