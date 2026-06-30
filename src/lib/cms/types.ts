export type ContactClickChannel = 'email' | 'phone' | 'whatsapp';

export type CmsLeadPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export type CmsFormSubmissionMeta = {
  formName: string;
  email?: string;
  path?: string;
  userId?: string;
  subscribe?: boolean;
};
