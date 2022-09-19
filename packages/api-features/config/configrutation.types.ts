export type AppConfigTypes = {
  mode: string;
  name: string;
  port: number;
  version: string;
  prefix: string;
};

export type DatabaseConfigTypes = {
  type: DatabaseProviderTypes;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type DatabaseProviderTypes =
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'cockroachdb'
  | 'sqlite'
  | 'mssql'
  | 'oracle'
  | 'sap'
  | 'spanner'
  | 'cordova'
  | 'nativescript'
  | 'react-native'
  | 'expo'
  | 'mongodb';
