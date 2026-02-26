import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./PatientRegForm.css";

const PatientRegForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone_number: "",
    next_of_kin: "",
    phone_number_next_of_kin: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/patients/postpatient/", formData);
      navigate("/success");
    } catch (err) {
      setError("Failed to register patient. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="patient-section">
      <div className="patient-container">
        <h3 className="patient-title">
          Patient Registration Portal
        </h3>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-grid">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone_number"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="next_of_kin"
              placeholder="Next of Kin"
              value={formData.next_of_kin}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone_number_next_of_kin"
              placeholder="Next of Kin Phone"
              value={formData.phone_number_next_of_kin}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Reason For Visiting"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Patient"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PatientRegForm;
