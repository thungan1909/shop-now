export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
}

// accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NjI2ODU0MTYsImV4cCI6MTc2MjY4NzIxNn0.Jh8bwUVO5ddmg-PyNucwM30siPJLiu9BnwhjKBbhQD4";
// email: "emily.johnson@x.dummyjson.com";
// firstName: "Emily";
// gender: "female";
// id: 1;
// image: "https://dummyjson.com/icon/emilys/128";
// lastName: "Johnson";
// refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NjI2ODU0MTYsImV4cCI6MTc2NTI3NzQxNn0.0fDvZs_i5YuvR7SP4UkaYJad6o5GM5cv7zYqqDrUNmU";
// username: "emilys";
