import Profile from "~/page/Profile";
import HeaderOnly from "~/components/Layout/HederOnly/index.js";
import Folowing from "~/page/Folowing";
import Home from "~/page/Home";
import Upload from "~/page/Upload";
import Search from "~/page/Search";

const publishRoutes = [
  { path: "/", component: Home },
  { path: "/upload", component: Upload, layout: HeaderOnly },
  { path: "/folowing", component: Folowing },
  { path: "/:nickname", component: Profile },

  { path: "/search", component: Search, layout: null },
];
const privateRoutes = [];
export { publishRoutes, privateRoutes };
