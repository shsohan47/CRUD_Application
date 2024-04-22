
import LoginPage from "../pages/LoginPage";
import NotePage from "../pages/NotesPages";

import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import RequiredAuth from "./RequiredAuth";
import SignUp from "../pages/SignUp";

import LogOut from "../pages/Logout";
// Define App component
function App() {
  // Return JSX for rendering

 
  
  return (
    <div>
      {/* BrowserRouter component wraps the entire application to enable routing */}
      <BrowserRouter>
        {/* Routes component defines the routes of the application */}
        <Routes>
          {/* Route for the home page, requiring authentication path="/" */}
          <Route index element={<RequiredAuth><NotePage/></RequiredAuth>}></Route>
          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>

          //\<Route path="/logout" element={<LogOut/>}></Route>

        </Routes>
        {/* Navigation links */}
           <NavigationLink/>
          
      </BrowserRouter>
    </div>
  );
}
const NavigationLink= ()=>
{
  const location = useLocation()

  const dynamicNavLink=()=>
  {
    
 
      if(location.pathname ==='/login')
      {
        return(<div></div>)
      }
      else{
        return(
          <>
          
          
          </>
        )
      }
    
  };

  return(<table>
    <tr>
      {dynamicNavLink()}
    </tr>
  </table>)
}
// Export the App component
export default App;