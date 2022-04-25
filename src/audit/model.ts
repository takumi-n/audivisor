export type Audit = {
  pkg: string;
  paths: string[];
  patchedVersions: string;
};

export type NormalizedAudits = {
  [packageName: string]: {
    [path: string]: string;
  };
};
