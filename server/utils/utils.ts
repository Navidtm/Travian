export const extractNumber = (v?: string | null) => v ? Number(v.match(/[0-9]/g)?.join('')) : 0;
