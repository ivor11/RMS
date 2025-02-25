import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'; // Optional: For app-wide styles

function App() {
  return (
    <div className="app">
      <Header title="Research Management System" /> 
      <main className="main-content">
        {/* Your main content goes here */}
        <p>This is the main content of my application.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;