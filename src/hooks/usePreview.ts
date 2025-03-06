import { getClient, isPreview } from '@/app/sanity/client';

type PreviewProps = {
  searchParams?: { preview?: string };
  params?: Record<string, any>;
};

export function withPreview<T>(
  query: (preview: boolean) => string
) {
  return async function fetchData(props?: PreviewProps): Promise<T> {
    const preview = isPreview(props?.searchParams);
    const client = getClient(preview);
    return client.fetch(query(preview), props?.params);
  };
}