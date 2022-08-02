import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Drugs from './pages/Drugs';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
   return (
      <main>
         <Router>
            <Navbar />
            <Routes>
               <Route exact path="/" element={<Home />} />
               <Route path="drugs">
                  <Route path=":name" element={<Drugs />} />
               </Route>
               <Route path="*" element={<NotFound />} />
            </Routes>
         </Router>
      </main>
   );
};

export default App;
