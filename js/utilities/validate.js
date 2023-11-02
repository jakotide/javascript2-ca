export function validateName(name) {
  return /^[a-zA-Z0-9_]+$/.test(name);
}

export function validateEmail(email) {
  const noroffEmail = /@noroff\.no$/;
  const studEmail = /@stud\.noroff\.no$/;

  return noroffEmail.test(email) || studEmail.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}
