export type tDocument = {
  _id?: string | null;
  name: string;
  ownerId: string;
  fileUrl: Array<{
    name: string;
    url: string;
  }>;
  status: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type tDocuemntStore = {
  document?: tDocument | null;
  documents?: tDocument[] | null;

  setDocumentStore: (
    key: keyof tDocuemntStore,
    value: tDocuemntStore[keyof tDocuemntStore]
  ) => void;
};
