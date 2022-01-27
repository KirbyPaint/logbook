import { Log } from '../entities/log.entity';

type Metadata = {
  idBefore: string; // the ID of the object before the selection
  idAfter: string; // the ID of the object after the selection
  total: number; // the total number of results found
  firstIdx: string; // the index of the first result
  lastIdx: string; // the index of the last result
  filterParams: {}; // the filter parameters used to find the results
  filterParamsHash: string; // the hash of the filter parameters used to find the results
  [key: string]: any;
};

export type LogMetadataType = {
  logs: Log;
  meta: Metadata;
};
