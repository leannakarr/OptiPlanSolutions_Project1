export default class Passenger{/* passanger class has all passenger information per passanger*/

    static passagerList = [];
    constructor(title, firstName, lastName, DOB, gender, nationality, email, phone, postCode, ABN=null){
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.gender = gender;
        this.nationality = nationality;
        this.email = email;
        this.phone = phone;
        this.postCode = postCode;
        this.ABN = ABN;
        this.PassengerId=`${this.email}${Date.now()}`;
    }
}