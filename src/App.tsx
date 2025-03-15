import Header from './components/Header';
import DocumentVersionControl from './components/DocumentVersionControl';
import ResearchPaperSearch from './components/ResearchPaperSearch';
import { useState, useEffect } from 'react';
import Footer from './components/Footer';

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleHeaderLinkClick = (componentId: string | null) => {
    setActiveComponent(componentId);
    if (componentId) { // Ensure componentId is not null before accessing the DOM.
        const element = document.getElementById(componentId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
  };

  useEffect(() => {
      const hash = window.location.hash.substring(1);
      if (hash === 'document-version-control' || hash === 'research-paper-search') {
          handleHeaderLinkClick(hash);
      }
  }, []);

  return (
    <div className="app min-h-screen flex flex-col bg-blue-100">
      <Header title="Research Management System" onLinkClick={handleHeaderLinkClick} />
      <main className="main-content flex flex-col items-center w-full mt-20 flex-1">
        <div className='w-full flex flex-col items-center'>
          {activeComponent === 'document-version-control' && (
            <div id='document-version-control' className='w-full'><DocumentVersionControl /></div>
          )}
          {activeComponent === 'research-paper-search' && (
            <div id='research-paper-search' className='w-full'><ResearchPaperSearch /></div>
          )}
           {activeComponent === null && (
              <div className="text-center max-w-4xl p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Research Management System</h2>
                 <div className='flex flex-wrap justify-center mt-6  gap-8'>
                     <div className='w-full sm:w-1/2 p-6 flex flex-col items-center bg-white rounded-lg shadow-md'>
                         <p className="text-gray-700 leading-relaxed text-center text-lg">Manage your research documents with version control.</p>
                     </div>
                      <div className='w-full sm:w-1/2 p-6 flex flex-col items-center bg-white rounded-lg shadow-md'>
                        <p className="text-gray-700 leading-relaxed text-center text-lg">Search for relevant research papers using the Crossref API.</p>
                    </div>
                 </div>
              </div>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;