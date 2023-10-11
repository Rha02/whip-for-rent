import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Home, About, Contact} from './pages';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/contact" component={Contact} />
//         {/* Add more routes for other pages */}
//       </Switch>
//     </Router>
//   );
// }

//Its saying that it cant find the pages folder even though its under frontend/src/pages
// export default App;

// import { Routes, Route } from 'react-router-dom';

// // Import Pages
// import { Home, About, Contact} from './pages';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path='/' element={<Home />}></Route>
//         <Route path='/signup' element={<About />}></Route>
//         <Route path='/search' element={<Contact />}></Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;