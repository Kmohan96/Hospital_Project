import "./OurServices.css";

const OurServices = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        <h2 className="services-title">
          Our Services
        </h2>

        <p className="services-subtitle">
          We provide the best healthcare services while ensuring all our
          services remain affordable and standardized.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <h4>Surgery</h4>
            <p>
              We have seasoned surgeons who are well-versed in modern
              procedures. We have successfully recorded a 100% success rate
              in all our procedures.
            </p>
            <button className="service-btn">Learn More</button>
          </div>

          <div className="service-card">
            <h4>Consultation</h4>
            <p>
              We offer consultation services ranging from traditional
              healthcare to technology-powered health solutions. Our
              services have become a benchmark over the years.
            </p>
            <button className="service-btn">Learn More</button>
          </div>

          <div className="service-card">
            <h4>Support</h4>
            <p>
              We provide 24/7 support services ensuring patients receive
              immediate assistance whenever needed.
            </p>
            <button className="service-btn">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
