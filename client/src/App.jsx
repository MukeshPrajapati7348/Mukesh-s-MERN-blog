import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import FooterComp from "./components/Footer";
import PrivateRoutes from "./components/PrivateRoutes";
import CreateBlog from "./pages/CreateBlog";
import AdminRoutes from "./components/AdminRoutes";
import UpdateBlog from "./pages/UpdateBlog";
import { Toaster } from "react-hot-toast";
import BlogPage from "./pages/BlogPage";
import ScrollToTheTop from "./components/ScrollToTheTop";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTheTop />
      <Toaster containerClassName="go4109123758" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:blogSlug" element={<BlogPage />} />
        <Route element={<AdminRoutes />}>
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/update-blog/:blogId" element={<UpdateBlog />} />
        </Route>
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App;
