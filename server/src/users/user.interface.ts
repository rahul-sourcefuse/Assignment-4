export interface BaseUser{
      firstName: string,
      middleName: string,
      lastName: string,
      email: string,
      phoneNumber: string,
      Role: string,
      Address: string,
      Doj: string


}

export interface User extends BaseUser{
    id: number;
}