export interface IUser {
    login: string;
    password?: string;
}
 export interface IUserRegister {
    login: string;
    password?: string;
    email: string;
 }

 export const UserStoragKey = 'current_user';

 export interface IBuyer {
    firstName: string,
      lastName: string,
      cardNumber: number,
      birthDate: Date,
      age: number,
      citizenship: string,
    
 }
 /*export interface IPostorder {
   userLogin: string,
   tourId: string,
   personalData: Date,

   
}*/