export class ParentRequiredError extends Error {}

export const rejectParentRequired = (msg: string) => {
  return Promise.reject(new ParentRequiredError(msg));
};

export const isNewID = (id?: string) => {
  return id && id.startsWith('new_');
};
