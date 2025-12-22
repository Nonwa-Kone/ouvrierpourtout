export type tDocument = {
  _id?: string | null;
  status?: string | null;
  name?: string | null;
  fileUrl?: Array<{
    filename?: string | null;
    url?: string | null;
  }>;
  createdAt?: string | null;
  updateAt?: string | null;
};

export type tDocuemntStore = {
  document?: tDocument | null;
  documents?: tDocument[] | null;

  setDocumentStore: (
    key: keyof tDocuemntStore,
    value: tDocuemntStore[keyof tDocuemntStore]
  ) => void;
};
