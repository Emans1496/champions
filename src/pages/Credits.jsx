import { useNavigate } from "react-router-dom";
import "../components/style/Credits.scss";
import { CSSTransition } from "react-transition-group";

export default function Credits() {
  const navigate = useNavigate();
  function returnToMenu() {
    setTimeout(() => {
      navigate("/main-menu");
    }, 0);
  }
  return (
    <>
      <CSSTransition
        in={true}
        appear={true}
        timeout={500}
        classNames="fade"
        unmountOnExit
      >
        <div className="Credits">
          <div className="CreditsContent">
            <h1>Credits</h1>
            <p>
              <br />
              <br />
              <strong>Game Assets</strong>
              <br />
              All assets used in the game, including logos, images, and audio
              clips, are the property of their respective owners. This project
              does not intend to replace or compete with official products.
              <br />
              <br />
              <strong>FIFA</strong>
              <br />
              All rights related to names, logos, images, and references
              associated with FIFA, including official logos, competitions,
              championships, and tournaments, are the exclusive property of FIFA
              and its authorized partners. This project does not intend to
              reproduce, exploit, or replace any official content from FIFA. Any
              use of names, images, symbols, or other materials protected by
              FIFA within this project is purely for educational and training
              purposes, with no profit or commercial intent.
              <br />
              <br />
              <strong>EA Sports and the EA FC Game</strong>
              <br />
              Design elements, card graphics, and other visual components
              inspired by EA Sports’ EA FC game have been used solely as
              references to demonstrate graphic and development skills and are
              not intended to replicate or replace the experience of the
              original game. EA Sports retains intellectual property rights to
              all graphics, game mechanics, and interfaces of its official
              product. This project is not affiliated, sponsored, endorsed, or
              supported by EA Sports in any way. Any use of images or concepts
              associated with EA FC is solely for personal development as a
              practical exercise.
              <br />
              <br />
              <strong>FIFPro and Player Likenesses</strong>
              <br />
              All rights related to the likeness, images, and identities of
              players belong to FIFPro or the organizations and players who hold
              these rights. This project includes images of players purely for
              portfolio purposes, with no commercial or profit-driven intent.
              FIFPro and the respective rights holders retain exclusive
              ownership of these contents; my use is solely educational and
              intended to showcase my technical and development skills.
              <br />
              <br />
              <strong>
                Other Copyrighted Materials (Texts, Images, Sounds, and Music)
              </strong>
              <br />
              This project includes some content, such as text snippets, images,
              sounds, and music, collected from the internet, which are the
              property of their respective copyright holders. No copyrighted
              material is used for commercial purposes or to generate profit,
              only as a portfolio example. All rights to texts, images, sounds,
              and music are reserved by their respective owners, and any
              reference to third-party content is solely intended for personal
              growth and skill demonstration. This project does not intend to
              replace or compete with official products.
              <br />
              <br />
              <strong>Educational and Portfolio Purposes</strong>
              <br />
              This project is designed as a personal exercise and as part of my
              resume, exclusively aimed at gaining practical experience and
              showcasing my technical skills in development. It is not intended
              for public distribution or as a commercial product. Any graphic,
              audio, or textual content used is included solely for
              demonstration purposes to improve my skills, with no commercial
              promotion involved.
            </p>
            <div className="BackButton">
              <button onClick={returnToMenu}>Return to Main Menu</button>
              <a
                href="https://www.linkedin.com/in/emanuele-squillante"
                target="_blank"
              >
                <button className="LinkedinButton">
                  {" "}
                  Discover me on LinkedIn
                </button>
              </a>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
