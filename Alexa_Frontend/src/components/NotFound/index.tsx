export const NotFound = () => {
  return (
    <>
      <nav>
        <div className="menu">
          <div className="menu_links">
            <a href="/app" className="link">
              Home
            </a>
            <a href="/login" className="link">
              Sign in
            </a>
          </div>
          <div className="menu_icon">
            <span className="icon"></span>
          </div>
        </div>
      </nav>

      <section className="wrapper">
        <div className="container">
          <div id="scene" className="scene" data-hover-only="false">
            <div className="circle" data-depth="1.2"></div>

            <div className="one" data-depth="0.9">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="two" data-depth="0.60">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <div className="three" data-depth="0.40">
              <div className="content">
                <span className="piece"></span>
                <span className="piece"></span>
                <span className="piece"></span>
              </div>
            </div>

            <p className="p404" data-depth="0.50">
              404
            </p>
            <p className="p404" data-depth="0.10">
              404
            </p>
          </div>

          <div className="text">
            <article>
              <p>
                Uh oh! Looks like you got lost. <br />
                Go back to the app page
              </p>
              <button>
                <a href="/app" className="link">
                  I understand
                </a>
              </button>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
