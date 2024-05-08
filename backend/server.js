import express  from "express";
import  cors  from "cors";
import swagger from "./config/swagger/swagger.js";
/* import { logger } from "logger-express"; */
import productRouter from "./config/routes/productRoutes.js";
import userRouter from "./config/routes/userRoutes.js";
import loginRouter from "./config/routes/loginRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
swagger(app)
app.use(express.json());
app.use(cors());
/* app.use(logger()); */
app.get("/",(req,res)=> {
  res.send("api en linea")
})
app.use("/api/v1", userRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", productRouter);


app.listen(PORT, () => {
  console.log(`🔥 Server ON 🔥 en el puerto http://localhost:${PORT}`); //local
  console.log(`market-place docs available at http://localhost:${PORT}/api/v1/docs`); //documentation local
  console.log(`market-place production documents available https://marketplace-if9n.onrender.com/api/v1/docs`);
});                                                      

export default app;
