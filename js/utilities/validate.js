export function validateEmail(email) {
    const noroffEmail = /@noroff\.no$/;
    const studEmail = /@stud\.noroff\.no$/;
  
    return noroffEmail.test(email) || studEmail.test(email);
  };