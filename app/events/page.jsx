"use client";
import { registrationSchema } from "@/utils/Zod";
import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    xstuname: "",
    xmobile: "",
    xstuemail: "",
    xpassword: "",
    xcpassword: "",
    xfmobile: "",
    xguardian: "",
    xgurdianmobile: "",
    xaddress: "",
    xrefno: "",
    xnid: "",
    xdistrict: "",
    xcountry: "",
    xsex: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = registrationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Validated Data:", result.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="gap-9">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="xstuname"
          value={formData.xstuname}
          onChange={handleChange}
        />
        {errors.xstuname && <p>{errors.xstuname}</p>}
      </div>

      <div>
        <label>Mobile</label>
        <input
          type="text"
          name="xmobile"
          value={formData.xmobile}
          onChange={handleChange}
        />
        {errors.xmobile && <p>{errors.xmobile}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="xstuemail"
          value={formData.xstuemail}
          onChange={handleChange}
        />
        {errors.xstuemail && <p>{errors.xstuemail}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="xpassword"
          value={formData.xpassword}
          onChange={handleChange}
        />
        {errors.xpassword && <p>{errors.xpassword}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="xcpassword"
          value={formData.xcpassword}
          onChange={handleChange}
        />
        {errors.xcpassword && <p>{errors.xcpassword}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};
export default RegistrationForm;
