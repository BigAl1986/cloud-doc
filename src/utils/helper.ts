interface FlattnedObj {
  id: string;
}

export const flattenArr = <T extends FlattnedObj>(
  arr: T[]
): { [key: string]: T } => {
  return arr.reduce((prev, next) => {
    prev[next.id] = next;
    return prev;
  }, {} as { [key: string]: T });
};

export const reverseFlattern = <T extends FlattnedObj>(obj: {
  [key: string]: T;
}): T[] => {
  return Object.keys(obj).map((key) => obj[key]);
};
