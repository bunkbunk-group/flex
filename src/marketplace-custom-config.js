/*
 * Marketplace specific configuration.
 */

export const amenities = [
  {
    key: 'wifi',
    label: 'Wi-Fi',
  },
  {
    key: 'clean_sheets_and_towels',
    label: 'Clean sheets & Towels',
  },
  {
    key: 'washing_machine',
    label: 'Washing machine',
  },
  {
    key: 'dishwasher',
    label: 'Dishwasher',
  },
  {
    key: 'hairdryer',
    label: 'Hairdryer',
  },
  {
    key: 'coffe_and_tea',
    label: 'Coffe & Tea',
  },
];

export const categories = [
  { key: 'bunk', label: 'Bunk in a shared space' },
  { key: 'room', label: 'Private room' },
  { key: 'daytime-stay', label: 'Daytime stay' },
  // { key: 'smoke', label: 'Smoke' },
  // { key: 'electric', label: 'Electric' },
  // { key: 'wood', label: 'Wood' },
  // { key: 'other', label: 'Other' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};
