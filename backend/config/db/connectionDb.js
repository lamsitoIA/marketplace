import pg from "pg";
import { host, user, password, database, port } from "../enviroment.js";
import "dotenv/config";

/* // Para acceder a la base de datos de production desde la terminal, ingresa a la terminal y luego pegas esto      psql postgres://hans:NXFUVonMgEmSGbUEcrkGEA33OK1Acw1E@dpg-cnp16dta73kc73d0644g-a.oregon-postgres.render.com/lam_production             esto postgres://hans:NXFUVonMgEmSGbUEcrkGEA33OK1Acw1E@dpg-cnp16dta73kc73d0644g-a.oregon-postgres.render.com/lam_production viene de External Database URL de render y solo le agregas el psql y luego el link al lado
const pool = new pg.Pool({
  //En JavaScript, new pg.Pool(...) crea una nueva instancia de un objeto que es una instancia de la clase Pool proporcionada por el módulo pg. Esta clase Pool es una clase proporcionada por el módulo pg que encapsula la lógica para administrar conexiones a la base de datos PostgreSQL utilizando el pool de conexiones. Entonces, en tu caso, new pg.Pool(...) es seguido de la creación de una instancia de la clase Pool
  host: host,
  user: user,
  password: password,
  database: database,
  port: port,
  allowExitOnIdle: true, //es una opción que indica que el proceso Node.js debe salir automáticamente cuando el pool de conexiones esté inactivo. Esto es útil en entornos como las aplicaciones de línea de comandos donde se espera que el proceso termine cuando no hay más tareas que realizar.,
});

export default pool; */

//2da opcion
/* let pool;
if (process.env.NODE_ENV === "production") {
  pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
} else {
  pool = new pg.Pool({
    //En JavaScript, new pg.Pool(...) crea una nueva instancia de un objeto que es una instancia de la clase Pool proporcionada por el módulo pg. Esta clase Pool es una clase proporcionada por el módulo pg que encapsula la lógica para administrar conexiones a la base de datos PostgreSQL utilizando el pool de conexiones. Entonces, en tu caso, new pg.Pool(...) es seguido de la creación de una instancia de la clase Pool
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
    allowExitOnIdle: true, //es una opción que indica que el proceso Node.js debe salir automáticamente cuando el pool de conexiones esté inactivo. Esto es útil en entornos como las aplicaciones de línea de comandos donde se espera que el proceso termine cuando no hay más tareas que realizar.,
  });
}

export default pool;

pool.on("connect", () => console.log("🔋 DB connected")); */ //para saber que la base de dato esta conectada

//3ra opcion asi funciona pasandolo directo

import "dotenv/config";
import pg from "pg"; 

//lo que hace new, es crear una instancia de objeto de Pool, entonces que hace Pool es para especificar la config para establecer la conexion a la base de datos, entonces por eso hacemos el new para que Pool pueda ser un objeto y asi agrupar todo.
//lo mismo que arriba pero de chat jpt:  "El uso de new crea una instancia de un objeto de Pool, que permite configurar la conexión a la base de datos. Pool es una clase que encapsula la lógica para administrar conexiones a la base de datos PostgreSQL utilizando un pool de conexiones. Al utilizar new, estamos creando un objeto que agrupa todas estas configuraciones y funcionalidades proporcionadas por la clase Pool."
const pool = new pg.Pool({
  host: process.env.DB_HOST_PROD,
  user: process.env.DB_USER_PROD,
  password: process.env.DB_PASSWORD_PROD,
  database: process.env.DB_NAME_PROD,
  port: process.env.DB_PORT_PROD,
  allowExitOnIdle: true 
});

export default pool;

/* host: process.env.DB_HOST_PROD,
  user: process.env.DB_USER_PROD,
  password: process.env.DB_PASSWORD_PROD,
  database: process.env.DB_NAME_PROD,
  port: process.env.DB_PORT_PROD, */

/* host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, */
