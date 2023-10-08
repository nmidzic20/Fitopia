export interface IPoint {
  startTimeNanos: string;
  endTimeNanos: string;
  dataTypeName: string;
  originDataSourceId: string;
  value: any;
}

export interface IDataset {
  dataSourceId: string;
  point: IPoint[];
}

export interface IBucket {
  startTimeMillis: string;
  endTimeMillis: string;
  dataset: IDataset[];
}

export interface IMessage {
  bucket: IBucket[];
}

export interface IFitnessData {
  message: IMessage;
}
