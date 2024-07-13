import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import { create } from "express-handlebars";
import { connectDB } from "./config/config.js"; 
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import AuthMiddleware from "./middleware/authMiddleware.js"; 
import ProductController from "./controllers/productController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

connectDB(); 

// Handlebars
const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  partialsDir: ["src/views/partials"],
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    res.locals.username = req.user.username || req.user.email.split("@")[0];
    res.locals.role = req.user.role;
  } else {
    res.locals.user = null;
    res.locals.username = null;
    res.locals.role = null;
  }
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

// Rutas
app.use("/", authRoutes);
app.use("/api/products", requireAuth, productRoutes);
app.use("/api/carts", requireAuth, cartRoutes);
app.use("/", requireAuth, viewRoutes);

app.get("/products", requireAuth, AuthMiddleware.current, ProductController.getProducts);

app.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  res.redirect("/products");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
