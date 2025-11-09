// export interface CoordinatesDTO {
//   lat: number;
//   lng: number;
// }

// export interface AddressDTO {
//   address: string;
//   city: string;
//   state: string;
//   stateCode: string;
//   postalCode: string;
//   coordinates: CoordinatesDTO;
//   country: string;
// }

// export interface HairDTO {
//   color: string;
//   type: string;
// }

// export interface BankDTO {
//   cardExpire: string;
//   cardNumber: string;
//   cardType: string;
//   currency: string;
//   iban: string;
// }

// export interface CompanyDTO {
//   department: string;
//   name: string;
//   title: string;
//   address: AddressDTO;
// }

// export interface CryptoDTO {
//   coin: string;
//   wallet: string;
//   network: string;
// }

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  //   hair: HairDTO;
  ip: string;
  //   address: AddressDTO;
  macAddress: string;
  university: string;
  //   bank: BankDTO;
  //   company: CompanyDTO;
  ein: string;
  ssn: string;
  userAgent: string;
  //   crypto: CryptoDTO;
  role: string;
}
