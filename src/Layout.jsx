import React from "react";
import Signup from "./pages/Signup";

const Layout = ({ children }) => {
  return (
    <div className="app">
      {/* Sidebar */}
      <Signup />
      <div className="app_content">{children}</div>
    </div>
  );
};

export default Layout;

/* 
  const [accountType, setAccountType] = useState("");

  const handleChange = (value) => {
    setAccountType(value);
  };

  const notify = () =>
    toast("🙏 Welcome to our platform! 🥳", toast_properties);
  
  
  <ToastContainer {...toast_container_props} />

      <Input type="text" label="Email" required />

      <RadioInput
        label="Account Type"
        name="accountType"
        required
        radioInputs={[
          { value: "student", label: "Student" },
          { value: "employee", label: "Employee" },
        ]}
        handleChange={handleChange}
        checkedValue={accountType}
      />

      <Button text="Notify !" onClick={notify} /> */
