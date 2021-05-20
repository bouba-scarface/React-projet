import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Game catalogue</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Head>
      <div className="container-fluid">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-gradient">
            <div className="container-fluid">
              <a className="navbar-brand text-white" href="/">
                Home
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                  <li className="nav-item">
                    <a className="nav-link active text-white" href="/games">
                      Games
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active text-white" href="/platforms">
                      Platforms
                    </a>
                  </li>

                  <li className="nav-item1"></li>
                </ul>
                <a
                  className="btn btn-outline-success"
                  type="button"
                  href="/cart"
                >
                  <div className="d-flex flex-row bd-highlight">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="badge">0</span>
                  </div>
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <form className="d-flex" method="post" action="/search">
                  <input
                    className="form-control me-2"
                    name="searchInput"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <Component {...pageProps} />

        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"></script>
      </div>
    </div>
  );
}

export default MyApp;
