import Header from './components/Header';
import Footer from './components/Footer';
import DocumentVersionControl from './components/DocumentVersionControl';
import ResearchPaperSearch from './components/ResearchPaperSearch';
import { useState } from 'react';

function App() {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleHeaderLinkClick = (componentId) => {
        setActiveComponent(componentId);
        const element = document.getElementById(componentId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="app min-h-screen">
            <Header title="Research Management System" onLinkClick={handleHeaderLinkClick} />
            <main className="main-content flex flex-col items-center w-full mt-20">
                <div className='w-full flex flex-col items-center'>
                {activeComponent === 'document-version-control' && (
                     <div id='document-version-control' className='w-full'><DocumentVersionControl/></div>
                )}
                {activeComponent === 'research-paper-search' && (
                    <div id='research-paper-search' className='w-full'><ResearchPaperSearch/></div>
                )}
            </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;