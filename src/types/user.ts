export interface UserData {
  email: string;
  name: string;
}

export interface UserMetaData {
  id: number;
  created_at: string;
}


export interface User extends UserData, UserMetaData {
// Since no explanation given.
// I decided that user's ID and CREATED_AT is system data 
// - setup by in the moment of creation
// - cant be changed by regular admin through default GUI/API
// 
// PS. Don't mess up with ID's
}