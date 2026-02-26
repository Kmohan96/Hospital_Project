import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Patient.css";
const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/patients/getpatient/");
        setPatients(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const updateStatus = async (id, status, extra = {}) => {
    try {
      setProcessingId(id);
      const response = await axios.patch(`/patients/getpatient/${id}/`, { status, ...extra });
      setPatients((prev) => prev.map((item) => (item.id === id ? response.data : item)));
    } catch (err) {
      console.error(err);
      setError("Failed to update patient status.");
    } finally {
      setProcessingId(null);
    }
  };

  const pendingCount = patients.filter((p) => p.status === "pending").length;
  const treatmentCount = patients.filter((p) => p.status === "in_treatment").length;
  const treatedCount = patients.filter((p) => p.status === "treated").length;

  if (loading) {
  return <div className="patient-loading">Loading patients...</div>;
}

if (error) {
  return <div className="patient-error">{error}</div>;
}

return (
  <div className="patient-wrapper">
    <div className="patient-card">

      <div className="patient-header">
        <h4>Patient Records</h4>
        <span>Total: {patients.length}</span>
      </div>
      <div className="patient-meta">
        <span className="pill pending">Pending: {pendingCount}</span>
        <span className="pill treatment">In Treatment: {treatmentCount}</span>
        <span className="pill accepted">Treated: {treatedCount}</span>
      </div>

      <div className="patient-table-wrapper">
        <table className="patient-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Next Of Kin</th>
              <th>Kin Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Treatment Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="12" className="empty-row">
                  No patients found
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td className="patient-name">
                    {patient.first_name}
                  </td>
                  <td>{patient.last_name}</td>
                  <td>{patient.address}</td>
                  <td className="email">{patient.email}</td>
                  <td>{patient.phone_number}</td>
                  <td>{patient.next_of_kin}</td>
                  <td>{patient.phone_number_next_of_kin}</td>
                  <td>{patient.message}</td>
                  <td>
                    <span className={`status-badge ${patient.status || "pending"}`}>
                      {patient.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <textarea
                      className="note-input"
                      rows="2"
                      placeholder="Treatment notes..."
                      value={noteDrafts[patient.id] ?? patient.treatment_notes ?? ""}
                      onChange={(e) =>
                        setNoteDrafts((prev) => ({ ...prev, [patient.id]: e.target.value }))
                      }
                    />
                  </td>
                  <td>
                    {patient.status === "pending" && (
                      <button
                        className="action-btn approve"
                        disabled={processingId === patient.id}
                        onClick={() => updateStatus(patient.id, "accepted")}
                      >
                        {processingId === patient.id ? "Saving..." : "Accept"}
                      </button>
                    )}

                    {patient.status === "accepted" && (
                      <button
                        className="action-btn treatment"
                        disabled={processingId === patient.id}
                        onClick={() =>
                          updateStatus(patient.id, "in_treatment", {
                            treatment_notes: noteDrafts[patient.id] ?? patient.treatment_notes ?? "",
                          })
                        }
                      >
                        {processingId === patient.id ? "Saving..." : "Start Treatment"}
                      </button>
                    )}

                    {patient.status === "in_treatment" && (
                      <button
                        className="action-btn treated"
                        disabled={processingId === patient.id}
                        onClick={() =>
                          updateStatus(patient.id, "treated", {
                            treatment_notes: noteDrafts[patient.id] ?? patient.treatment_notes ?? "",
                          })
                        }
                      >
                        {processingId === patient.id ? "Saving..." : "Mark Treated"}
                      </button>
                    )}

                    {patient.status !== "rejected" && patient.status !== "treated" && (
                      <button
                        className="action-btn reject"
                        disabled={processingId === patient.id}
                        onClick={() => updateStatus(patient.id, "rejected")}
                      >
                        {processingId === patient.id ? "Saving..." : "Reject"}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);

};

export default Patient;
