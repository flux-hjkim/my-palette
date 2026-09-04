import { Link } from "react-router-dom";
import homePaletteImage from "../assets/home-palette.jpg";
import "./Home.css";

function Home() {
  return (
    <main className="page-container home-page">
      <section className="home-hero">
        <div className="home-hero__image-area">
          <img
            src={homePaletteImage}
            alt="Color palette with flowers and fruits"
            className="home-hero__image"
          />
        </div>

        <div className="home-hero__content">
          <p className="home-hero__label">MY COLOR ARCHIVE</p>

          <h1 className="home-hero__title">
            A Color Archive
            <br />
            For Every Side Of Me
          </h1>

          <p className="home-hero__description">
            Collect your tastes, interests, moods, and dreams
            <br />
            as colors that help you understand yourself more clearly.
          </p>

          <Link to="/mypalette" className="home-hero__button">
            Start My Palette
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
