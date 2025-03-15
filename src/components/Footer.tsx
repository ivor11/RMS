
const Footer = () => {
 const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 py-5 text-center text-gray-700">
      <div className="max-w-6xl mx-auto">
       <p>© {currentYear} My Comp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;