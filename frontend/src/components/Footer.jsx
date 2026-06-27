

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* Left Side */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Job Hunt</h2>
            <p className="text-sm">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/_rizzchit_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.321 4 20 5.679 20 7.75v8.5C20 18.321 18.321 20 16.25 20h-8.5C5.679 20 4 18.321 4 16.25v-8.5C4 5.679 5.679 4 7.75 4zm8.75 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition duration-300"
              aria-label="Twitter"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.944 13.944 0 011.671 3.149 4.916 4.916 0 003.195 9.72a4.903 4.903 0 01-2.229-.616v.06a4.917 4.917 0 003.946 4.817 4.996 4.996 0 01-2.224.084 4.918 4.918 0 004.59 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.504 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/rachit-thapliyal-48a536340/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452H16.85v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.267V9h3.452v1.561h.049c.481-.909 1.654-1.867 3.404-1.867 3.641 0 4.314 2.396 4.314 5.515v6.243zM5.337 7.433a2.062 2.062 0 11.004-4.124 2.062 2.062 0 01-.004 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
