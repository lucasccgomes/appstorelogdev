import { useState, useEffect } from 'react';
import { MdDarkMode, MdOutlineLightMode, MdInstallDesktop, MdInstallMobile } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import { CSSTransition } from 'react-transition-group';
import { isMobile } from 'react-device-detect';
import '../../animations/animations.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Verificar se o PWA já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Apps', href: '#' },
    { name: 'Jogos', href: '#' },
    { name: 'Crianças', href: '#' },
    { name: 'Login', href: '#' },
  ];

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow transition duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white transition duration-500 ease-in-out">Logo</div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-800 dark:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 ease-in-out"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="bg-gray-200 dark:bg-gray-600 p-2 rounded-full focus:outline-none transition duration-500 ease-in-out"
              >
                {darkMode ? <MdOutlineLightMode /> : <MdDarkMode />}
              </button>
              {isInstallable && (
                <button
                  onClick={handleInstallClick}
                  className="bg-teal-500 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-500 ease-in-out flex items-center "
                >
                  {isMobile ? <MdInstallMobile /> : <MdInstallDesktop />}
                  <span className="ml-2">Instalar App</span>
                </button>
              )}
              <button
                onClick={toggleMenu}
                className="ml-4 md:hidden bg-gray-200 dark:bg-gray-600 p-2 rounded-full focus:outline-none transition duration-500 ease-in-out"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="menu"
        unmountOnExit
      >
        <div className="md:hidden fixed inset-0 flex z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 transition duration-500 ease-in-out transform">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600 transition duration-500 ease-in-out"
                onClick={toggleMenu}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white transition duration-500 ease-in-out"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Navbar;
