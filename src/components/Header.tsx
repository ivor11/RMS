import React from 'react';
import NotificationIcon from './NotificationIcon';

interface HeaderProps {
  title?: string;
  onLinkClick: (componentId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title = "My Awesome Site", onLinkClick }) => {
  const handleDocumentClick = () => {
    onLinkClick('document-version-control');
  };
  const handleSearchClick = () => {
    onLinkClick('research-paper-search');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 text-gray-700 z-10 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center flex-wrap md:flex-nowrap">
        <h1 className="text-xl font-semibold mr-6 mb-2 md:mb-0">{title}</h1>
        <nav className='flex items-center w-full md:w-auto'>
          <ul className='flex flex-col md:flex-row'>
            <li className='mx-2 mb-1 md:mb-0'>
              <button
                onClick={handleDocumentClick}
                className="py-1 font-medium transition-colors duration-200 hover:text-gray-900 hover:underline bg-transparent border-none cursor-pointer focus:outline-none"
              >
                Document Version Control
              </button>
            </li>
            <li className='mx-2'>
              <button
                onClick={handleSearchClick}
                className="py-1 font-medium transition-colors duration-200 hover:text-gray-900 hover:underline bg-transparent border-none cursor-pointer focus:outline-none"
               >
                Research Paper Search
              </button>
            </li>
          </ul>
        </nav>
         <NotificationIcon />
      </div>
    </header>
  );
};

export default Header;