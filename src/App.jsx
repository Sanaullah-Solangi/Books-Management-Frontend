// HOOKS
import { useContext } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Signup from "./pages/auth/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksPage from "./pages/books/Books";
import BookDetailPage from "./pages/books/BookDetailPage";
import AddBookPage from "./pages/books/AddBookPage";
import UpdateBookPage from "./pages/books/UpdateBookPage";
import Login from "./pages/auth/login";

// PAGES & COMPONENTS
//Auth-Components

function AppRouter() {
  const { isUser } = useContext(UserContext);
  console.log(Boolean(isUser));
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH ROUTES STACK */}
        <Route
          path="/auth"
          element={
            isUser ? (
              <Navigate to={"/"} />
            ) : (
              <>
                <Outlet />
              </>
            )
          }
        >
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* HOME ROUTES STACK */}
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Outlet />
              <Footer />
            </div>
          }
        >
          <Route index element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route
            path="/books/add"
            element={isUser ? <AddBookPage /> : <Navigate to={"/"} />}
          />
          <Route path="/books/edit/:id" element={<UpdateBookPage />} />
        </Route>
        {/* NOT FOUND ROUTE */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen w-screen text-5xl">
              Page Not Found
            </div>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default AppRouter;
