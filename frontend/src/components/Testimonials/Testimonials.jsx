import { useState, useEffect } from "react";
import "./Testimonials.css";

import img1 from "../../assets/test1.jpg";
import img2 from "../../assets/test2.jpg";
import img3 from "../../assets/test3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Anna Deynah",
    image: img1,
    text: "Purity hospital has been a revelation to me. I can’t count how many times this organization has come to my rescue. They are simply the best."
  },
  {
    id: 2,
    name: "Douglas David",
    image: img2,
    text: "Their flexible payment structure is out of this world compared to the excellent service they provide."
  },
  {
    id: 3,
    name: "Shane Wayne",
    image: img3,
    text: "Simply the best! Their staff are so hospitable and truly value human life."
  }
];

const TestimonialsMultiPage = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const { name, image, text } = testimonials[index];

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2>Testimonials</h2>

        <div className="testimonial-card">
          <img src={image} alt={name} />
          <h4>{name}</h4>
          <p>“{text}”</p>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((item, i) => (
            <span
              key={item.id}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsMultiPage;
