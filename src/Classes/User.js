//fs import from "fs"
export default class User {
  /* the class user has a local user list storing the email and 
  pasword fields, it contains atrabutes email, password, user cart
  array and user information field for auto fills*/
  static userList = [];

  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.userCart = [];
    this.userInformation = null;
    this.pastBooking = [];
  }
  //when register check if the email is unique
  register() {
    const exists =User.userList.find(user => user.email === this.email);
    if(exists){
      return "User email already exists please log in";
    }else{
      User.userList.push(this)
      return "User registered successfully";
    }
  }

  static login(email, password) {
    return User.userList.find(
      user =>
        user.email === email &&
        user.password === password
    );
  }
  /*static saveUser() {
    fs.writeFileSync(
      "../Data/users.json",
      JSON.stringify(User.userList, null, 2)
    );
  }
  addUserInformation(title, firstName, lastName, DOB, gender, nationality, phone, postCode, ABN){ 
    this.userInformation = new Passenger(title, firstName, lastName, DOB, gender, nationality, this.email, phone, postCode, ABN);
    User.saveUser();
    
  }*/
  
}