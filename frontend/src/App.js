import React, { useState } from "react";

import WelcomeScreen from "./pages/WelcomeScreen";
import RoleSelection from "./pages/RoleSelection";
import StaffSelection from "./pages/StaffSelection";
import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";

import DoctorLogin from "./components/DoctorLogin";
import DoctorDashboard from "./components/DoctorDashboard";

function App() {

  const [darkMode, setDarkMode] = useState(true);

  const [currentPage, setCurrentPage] = useState("welcome");

  const [loggedPatient, setLoggedPatient] = useState(null);
  const [loggedDoctor, setLoggedDoctor] = useState(null);
  const [loggedStaff, setLoggedStaff] = useState(null);

  return (
    <>

      {/* Welcome Screen */}

      {currentPage === "welcome" && (
        <WelcomeScreen
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onEnter={() => setCurrentPage("roles")}
        />
      )}

      {/* Role Selection */}

      {currentPage === "roles" && (
        <RoleSelection
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onPatient={() => setCurrentPage("patientLogin")}
          onStaff={() => setCurrentPage("staffSelection")}
        />
      )}

      {/* Staff Selection */}

      {currentPage === "staffSelection" && (
        <StaffSelection
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onDoctor={() => setCurrentPage("doctorLogin")}
          onOtherStaff={() => setCurrentPage("staffLogin")}
          onBack={() => setCurrentPage("roles")}
        />
      )}

      {/* Patient Login */}

      {currentPage === "patientLogin" && (
        <PatientLogin
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onBack={() => setCurrentPage("roles")}
          onLogin={(patient) => {
            setLoggedPatient(patient);
            setCurrentPage("patientDashboard");
          }}
        />
      )}

      {/* Patient Dashboard */}

      {currentPage === "patientDashboard" && (
        <PatientDashboard
          patient={loggedPatient}
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onBack={() => {
            setLoggedPatient(null);
            setCurrentPage("patientLogin");
          }}
        />
      )}

      {/* Doctor Login */}

      {currentPage === "doctorLogin" && (
        <DoctorLogin
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onBack={() => setCurrentPage("staffSelection")}
          onLogin={(doctor) => {
            setLoggedDoctor(doctor);
            setCurrentPage("doctorDashboard");
          }}
        />
      )}

      {/* Doctor Dashboard */}

     {currentPage === "doctorDashboard" && (
  <DoctorDashboard
    doctor={loggedDoctor}
    darkMode={darkMode}
    toggleTheme={() => setDarkMode(!darkMode)}
  />
)}

      {/* Staff Login */}

      {currentPage === "staffLogin" && (
        <StaffLogin
          darkMode={darkMode}
          toggleTheme={() => setDarkMode(!darkMode)}
          onBack={() => setCurrentPage("staffSelection")}
          onLogin={(staff) => {
            setLoggedStaff(staff);
            setCurrentPage("staffDashboard");
          }}
        />
      )}

      {/* Staff Dashboard */}

      {currentPage === "staffDashboard" && (
    <StaffDashboard
        staff={loggedStaff}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
    />
)}

    </>
  );
}

export default App;