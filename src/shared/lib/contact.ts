export const MAX_NAME_LENGTH = 100;
export const MAX_CONTACT_LENGTH = 200;
export const MAX_MESSAGE_LENGTH = 2_000;
export const MAX_BODY_SIZE = 8_192;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_USERNAME_PATTERN = /^@[A-Za-z][A-Za-z0-9_]{4,31}$/;

export const readText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export const isValidContact = (contact: string) =>
  !contact || EMAIL_PATTERN.test(contact) || TELEGRAM_USERNAME_PATTERN.test(contact);
