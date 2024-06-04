const ERRORS = [
  { code: "23502" , status: 400, message: "None of the Fields can be empty"},
{ code: "22P02" , status: 400, message: "el tipo de dato no corresponde, bad request"},
{ code : "2201W" , status : 400, message : "El parámetro /limit/ debe ser un número entero positivo."},
{ code : "42601" , status : 400, message : "Error de sintaxis"},
{ code: `42P01` , status: 500, message: "Error in conneciton with data base"},
{ code: "auth_01", status: 400, message: "Username does not exist" },
{ code: "auth_02", status: 400, message: "Invalid password" },
{ code: "auth_03", status: 401, message: "token must be present" },
{ code: "auth_04", status: 401, message: "the token is not valid" },
{ code: "22001", status: 400, message: "exceeds the allowed type of characters"},
{ code: "23505", status: 400, message: "Has a unique constraint and cannot be repeated in the database"}
];


export default ERRORS