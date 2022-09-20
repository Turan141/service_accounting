/* tslint:disable */
/* eslint-disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { TaskStatusesEnum } from '@pages/Flights/components/StatusColumn/StatusColumn';

export interface ResponseSuccessOfDocumentView {
  result?: DocumentView;
}

export interface DocumentView {
  /** @format int32 */
  id: number;
  number?: string;
  status: TaskStatusesEnum;
  createdBy?: string;
  lastModifiedBy?: string;

  /** @format int64 */
  createdAt: number;
  completed: string;
  started: string;
  completedFixed: string;
  startedFixed: string;
  endPlan: string;
  startPlan: string;
  /** @format int64 */
  lastModifiedAt: number;
  properties?: Record<string, string>;
  items?: DocumentItemView[];
  aircraft: any;
  aircraftName: any;
  company: any;
  aircraftType: any;
  customerReference: any;
  aircraftReference: any;
  flight: any;
  uploadedFile: File;
  signFormInCreateModal: string;
}

export interface DocumentItemView {
  /** @format int32 */
  id: number;
  title?: string;
  type?: string;

  /** @format int32 */
  orderingPresentation: number;
  status?: string;
  masterCode?: string;
  name?: string;
  createdBy?: string;
  createdByFullName?: string;
  lastModifiedBy?: string;
  lastModifiedByFullName?: string;

  /** @format int64 */
  createdAt: number;

  /** @format int64 */
  lastMidifiedAt: number;
  properties?: Record<string, any>;
  childs?: DocumentItemView[];
  additionalInfo?: string;
  reference?: ReferenceView;
}

export interface ReferenceView {
  name?: string;
  description?: string;
  masterCode?: string;
  parentMasterCode?: string;
  properties?: Record<string, string>;

  /** @format int32 */
  orderPresentation?: number;
}

export interface ResponseSuccessOfResponsePaginationOfDocumentView {
  result?: ResponsePaginationOfDocumentView;
}

export interface ResponsePaginationOfDocumentView {
  items?: DocumentView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export type RequestPaginationOfDocumentFilter = RequestPagination & {
  filter?: DocumentFilter;
};

export interface DocumentFilter {
  number?: string;
  statuses?: string[];
  valuesFilter?: Record<string, string>;
  valuesRangeFilter?: PropertyValueRangeFilter[];
}

export interface PropertyValueRangeFilter {
  name: string;
  from: string;
  to: string;
}

export interface RequestPagination {
  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  skip: number;

  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  take: number;
}

export interface DocumentDto {
  status?: string;
  properties?: Record<string, string>;
  items?: DocumentItemDto[];
}

export interface DocumentItemDto {
  /** @pattern [A-Za-z]+ */
  type: string;

  /** @pattern [A-Za-z]+ */
  status?: string;
  referenceMasterCode?: string;
  additionalInfo?: string;
  properties?: Record<string, string>;
  childs?: DocumentItemDto[];
}

export interface DocumentItemUpdateDto {
  referenceMasterCode?: string;
  additionalInfo?: string;
  properties?: Record<string, string>;
}

export interface ResponseSuccessOfICollectionOfActionView {
  result?: ActionView[];
}

export interface ActionView {
  name: string;
  type?: string;
  message?: string;

  /** @format int32 */
  documentId: number;

  /** @format int32 */
  documentItemid?: number;

  /** @format int64 */
  modified: number;
  created?: string;
  deleted?: string;
  description?: string;
  user?: UserNames;
}

export interface UserNames {
  fullName?: string;
  firstName?: string;
  secondName?: string;
  staffId?: string;
}

export interface ResponseSuccessOfRequestPaginationOfDocumentTypeView {
  result?: RequestPaginationOfDocumentTypeView;
}

export type RequestPaginationOfDocumentTypeView =
  RequestPagination & { filter?: DocumentTypeView };

export interface DocumentTypeView {
  /** @format int32 */
  id: number;
  name?: string;
  description?: string;
  properties?: PropertyView[];
  statuses?: DocumentTypeStatusView[];
  items?: DocumentItemTypeView[];
}

export interface PropertyView {
  name?: string;
  description?: string;

  /** @format int32 */
  valueType: number;
  isRequired: boolean;
  enumValues?: number[];
  refMasterCode?: string;
}

export interface DocumentTypeStatusView {
  name?: string;
  description?: string;
}

export interface DocumentItemTypeView {
  name?: string;
  description?: string;
  refMasterCode?: string;
  isRequiredItemReference: boolean;
  properties?: PropertyView[];
  statuses?: DocumentItemTypeStatusView[];
}

export interface DocumentItemTypeStatusView {
  name?: string;
  description?: string;
}

export interface ResponseSuccessOfResponsePaginationOfAttachmentView {
  result?: ResponsePaginationOfAttachmentView;
}

export interface ResponsePaginationOfAttachmentView {
  items?: AttachmentView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export interface AttachmentView {
  name?: string;
  mimeType?: string;
  url?: string;

  /** @format int64 */
  created: number;
}

export interface ProblemDetails {
  type?: string;
  title?: string;

  /** @format int32 */
  status?: number;
  detail?: string;
  instance?: string;
  extensions?: Record<string, any>;
}

export interface ResponseSuccessOfResponseImport {
  result?: ResponseImport;
}

export interface ResponseImport {
  /** @format int32 */
  itemsTotal: number;

  /** @format int32 */
  itemsSuccess: number;

  /** @format int32 */
  itemsError: number;
  errors?: Record<string, string>;
}

export interface RequestImportOfEmployeeCreateDto {
  items: EmployeeCreateDto[];
}

export interface EmployeeCreateDto {
  name?: string;
  surname?: string;
  patronymic?: string;
  staffId: string;
  emplId?: string;
}

export interface RequestImportOfReferenceCreateDto {
  items: ReferenceCreateDto[];
}

export interface ReferenceCreateDto {
  name: string;
  description?: string;
  masterCode: string;
  parentMasterCode?: string;

  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  orderPresentation?: number;
}

export interface RequestImportOfReferencePropertyDto {
  items: ReferencePropertyDto[];
}

export interface ReferencePropertyDto {
  name: string;
  description?: string;
  valueType: PropertyValueType;
  isRequired: boolean;
  enumValues?: number[];
  refMasterCode?: string;
}

export enum PropertyValueType {
  Integer = 0,
  Double = 1,
  Boolean = 2,
  String = 3,
  DateTime = 4,
  Enum = 5,
  Ref = 6,
  Employee = 7,
}

export interface RequestImportOfReferenceItemDto {
  items: ReferenceItemDto[];
}

export interface ReferenceItemDto {
  name: string;
  description?: string;
  masterCode: string;
  values: Record<string, string>;

  /**
   * @format int32
   * @min 0
   * @max 2147483647
   */
  orderPresentation?: number;
}

export interface RequestImportOfDocumentTypeDto {
  items: DocumentTypeDto[];
}

export interface DocumentTypeDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  statuses?: DocumentStatusDto[];
  properties?: DocumentTypePropertyDto[];
  items?: DocumentItemTypeDto[];
}

export interface DocumentStatusDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
}

export interface DocumentTypePropertyDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  valueType: PropertyValueType;
  enumValues?: number[];
  refMasterCode?: string;
  isRequired: boolean;
}

export interface DocumentItemTypeDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  refMasterCode?: string;
  isRequiredItemReference: boolean;
  properties?: DocumentItemTypePropertyDto[];
  statuses?: DocumentItemStatusDto[];
}

export interface DocumentItemTypePropertyDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
  valueType: PropertyValueType;
  enumValues?: number[];
  refMasterCode?: string;
  isRequired: boolean;
}

export interface DocumentItemStatusDto {
  /** @pattern [A-Za-z]+ */
  name: string;
  description?: string;
}

export interface ResponseSuccessOfResponsePaginationOfReferenceView {
  result?: ResponsePaginationOfReferenceView;
}

export interface ResponsePaginationOfReferenceView {
  items?: ReferenceView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export type RequestPaginationReference = RequestPagination & {
  filter?: ReferenceFilter;
  valuesFilter?: Record<string, string>;
  valuesRangeFilter?: PropertyValueRangeFilter[];
  propertiesSearch?: PropertiesSearch;
};

export interface ReferenceFilter {
  name?: string;
  itemMasterCode?: string;
}

export interface PropertiesSearch {
  properties: string[];
  value: string;
  fullMatch?: boolean;
}

export interface ResponseSuccessOfIEnumerableOfPropertyView {
  result?: PropertyView[];
}

export interface ResponseSuccessOfIEnumerableOfReferenceView {
  result?: ReferenceView[];
}

export interface ResponseSuccessOfEmployeeView {
  result?: EmployeeView;
}

export interface EmployeeView {
  name?: string;
  surname?: string;
  patronymic?: string;
  staffId?: string;
}

export interface ResponseSuccessOfResponsePaginationOfEmployeeView {
  result?: ResponsePaginationOfEmployeeView;
}

export interface ResponsePaginationOfEmployeeView {
  items?: EmployeeView[];

  /** @format int32 */
  count: number;

  /** @format int32 */
  total: number;
}

export type RequestPaginationOfEmployeeFilter = RequestPagination & {
  filter?: EmployeeFilter;
};

export interface EmployeeFilter {
  fullName?: string;
}
