export const ELEMENT_PER_PAGE = 3;

export const usePagination = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elements: any[] | undefined,
  currentPage: number
) => {
  if (!elements) return [];
  const endIndex = currentPage * ELEMENT_PER_PAGE;
  const startIndex = endIndex - ELEMENT_PER_PAGE;
  const currentElements = elements.slice(startIndex, endIndex);
  return currentElements;
};
