class Alarm {
    constructor(id, title, lastName, fatherName, classEnrolled,
        age, phoneNumber, subject, year, semester, status ) {
            this.id = id;
            this.title = title;
            this.lastName = lastName;
            this.fatherName = fatherName;
            this.classEnrolled = classEnrolled;
            this.age = age;
            this.phoneNumber = phoneNumber;
            this.subject = subject;
            this.year = year;
            this.semester = semester;
            this.status = status;
    }
}

module.exports = Alarm;