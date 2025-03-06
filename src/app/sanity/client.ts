import { createClient } from "next-sanity";
import { groq } from "next-sanity";


const clientConfig = {
  projectId: "g52h9yna",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
};

export const client = createClient(clientConfig);

export const previewClient = createClient({
  ...clientConfig,
  token: 'skraazF62HDrldjkBIiI06MHPoaZPFqgRP4wsv4t7HvQhHc3DZaEl6uyLSLatv0tcmWem8NboLXGQZhQGBDtX0DeY9G2Hy8LN68FAwcjg4WSEwYvREWqs0HGSgzcofnhyoxCt0J52mJCX5D1ciH1P0OVqHr33ILdY90Nhn7quEhXSsz4TcVA',
  perspective: "previewDrafts",
});


export const getClient = (preview = false) => (preview ? previewClient : client);

export const isPreview = (searchParams?: { preview?: string }) => {
  return searchParams?.preview === 'true';
};

export const buildPreviewQuery = (baseQuery: string, previewMode: boolean) => groq`
  *[
    ${baseQuery}
    ${previewMode ? '' : '&& !(_id in path("drafts.**"))'}
  ]
  ${previewMode ? '| order(_updatedAt desc)' : ''}
`;