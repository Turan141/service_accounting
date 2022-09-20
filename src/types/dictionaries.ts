export interface DictionaryModel {
  description: string;
  masterCode: string;
  name: string;
  orderPresentation: number;
  parentMasterCode: string;
  properties?: {};
  
}

export interface DictionaryGetResponseModel<D> {
  total: number;
  result: D[];
}
