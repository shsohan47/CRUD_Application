
import LoginPage from "../pages/LoginPage";
import NotePage from "../pages/NotesPages";

import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
//import GetNote from "./Components/getNotes";
function App() {

    

  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route index element={<NotePage/>}></Route>
        <Route path="/login" element = {<LoginPage/>}></Route>
      </Routes>
      <table>
        <tr>
          <td><Link to="/" style={{color:"black"}}>Home</Link></td>
          <td><Link to="/login" style={{color:"black"}}>Login</Link></td>
          
          </tr>
        </table>
      </BrowserRouter>
      
    </div>
  );
}
export default App;
