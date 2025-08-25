 
  export class studentService {
    async checkRegistrationStatus(phoneNumber) {
    const student = await this.getStudentByPhone(phoneNumber);

    if (!student) {
      return {
        isRegistered: false,
        isVerified: false,
        isCompleteRegistration: false,
      };
    }

    return {
      isRegistered: true,
      isVerified: student.xverified === 1,
      isCompleteRegistration: student.xstuemail !== "", // Checking if the email is set
    };
  }


  }