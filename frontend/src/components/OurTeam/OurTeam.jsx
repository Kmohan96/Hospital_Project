import "./TeamPage.css";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/author.jpg";
import cto from "../../assets/cto.jpg";

const TeamPage = () => {
  return (
    <section className="team-section">
      <div className="team-container">
        <h2 className="team-title">Our Amazing Team</h2>

        <p className="team-subtitle">
          We pride ourselves in the fact that all our personnel are
          professionals in their respective fields and uphold the best
          practices in the health industry.
        </p>

        <div className="team-grid">
          <div className="team-card">
            <img src={img1} alt="Michael Jason" />
            <h5>Micheal Jason</h5>
            <span>Neurosurgeon</span>
            <p>Chief Surgeon</p>
          </div>

          <div className="team-card">
            <img src={img2} alt="Dr John Doe" />
            <h5>Dr John Doe</h5>
            <span>Surgeon</span>
            <p>VP Emergency Response Team</p>
          </div>

          <div className="team-card">
            <img src={img3} alt="Sandra Smith" />
            <h5>Sandra Smith</h5>
            <span>Marketing Executive</span>
            <p>Chief Marketing Officer</p>
          </div>

          <div className="team-card">
            <img src={cto} alt="Tom Adams" />
            <h5>Tom Adams</h5>
            <span>Software Engineer</span>
            <p>Chief Technology Officer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
