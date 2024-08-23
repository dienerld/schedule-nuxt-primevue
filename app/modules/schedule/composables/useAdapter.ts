type AdapterDisplayName = 'morning' | 'afternoon';

export function useAdapter() {
  return {
    adapterDisplayName(adapter: AdapterDisplayName) {
      const values: Record<AdapterDisplayName, string> = {
        afternoon: 'Tarde',
        morning: 'Manha',
      };

      return values[adapter];
    },
  };
}
