import { RootState } from '@store/index';

export const getAttachments = (store: RootState) =>
  store.attachments.tenderSignature;
