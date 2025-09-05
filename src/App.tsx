import Header from './components/Header/Header';
import Main from './pages/Main/Main';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Main />
      </div>
    </div>
  );
};

export default App;
