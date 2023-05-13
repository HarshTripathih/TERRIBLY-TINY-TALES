
import Dashboard from "./Component/Dashboard";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bargraph from "./Component/Bargraph";
import { PieChart } from "recharts";

function App() {


  return (
    <Router>
      <div>

        <Dashboard />
        <Routes>
          {/* <Route exact path="/bargraph" element={<Bargraph />} /> */}
          <Route exact path="/piechart" element={<PieChart />} />
        </Routes>



      </div>
    </Router>
  );
}

export default App;