export const generatePatientQrCodeId = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!.-_~';
  let qrCode = '';
  for (let i = 0; i < 8; i++) {
    qrCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return qrCode;
};
