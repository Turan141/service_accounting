import { TaskStatusesEnum } from '@src/pages/Flights/components/StatusColumn/StatusColumn';
import { DocumentItemView } from '@typings/swagger/api';

export type DocumentType = 'Requests';

export interface AddPositionsToDocumentProps {
  documentType?: DocumentType;
  documentId?: number;
  items?: DocumentItemView[];
  status?: TaskStatusesEnum;
}
