import "./footer.css";
export default function Footer() {
  return (
    <footer className="bg-[#183e47] text-white py-6 mt-10 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 footer-info">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">infos</h2>
        </div>

        <div className=" space-x-6 text-xl footer-icons d-flex justify-content-between">
          <ul>
            <h4>scoil media</h4>
            <li>
              <a
                href="https://www.instagram.com/ilyas_mouss/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C4A77D] mb-1"
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              instagram
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/ilyas-moussnaoui/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C4A77D] mb-1"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              LinkedIn
            </li>
            <li>
              <a
                href="https://github.com/ilyasshould"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C4A77D] mb-1"
                title="github"
              >
                <i class="fa-brands fa-github"></i>
              </a>
              Github
            </li>
          </ul>
          <ul>
            <h4>Contact</h4>
            <li>
              <a href="tel:+21247683461" className="icon-link mb-2" title="Phone">
                <i className="fa-solid fa-phone"></i>
              </a>
              <span>+21247683461</span>
            </li>
            <li>
              <a
                href="mailto:ilyas.moussnaoui@gmail.com"
                className="icon-link"
                title="Email"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <span>ilyas.moussnaoui@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
