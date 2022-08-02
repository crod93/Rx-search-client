export const makeStringSEOFriendly = (str) => {
   return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/&/g, '-and-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-*/, '')
      .replace(/-*$/, '');
};
