/*
   This is the main component that will be rendered when the user navigates to the /contact route.
    It contains a form that allows users to submit inquiries to the website admin.
    The form includes fields for the user's full name, email address, inquiry type, and message.
    The user must verify their email address by entering an OTP sent to their email before submitting the form.
    The form data is validated on the client-side before submission.
    If the form is successfully submitted, a confirmation email is sent to the user.
    The form uses Axios to make HTTP requests to the backend server for sending OTP and confirmation emails.
    The backend server code for handling these requests is provided in the OTPserver/server.js file.
    The form includes error handling for invalid input and displays error messages to the user.
    The form also includes a success message when the form is successfully submitted.
    
    Author: Mohammad Zaid Khan
 */
import React, { useState } from "react";
import axios from "axios";

/**
 * InquiryForm component handles the rendering and submission of an inquiry form.
 * It includes form validation, OTP sending and verification, and form submission.
 */
const InquiryForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    inquiryType: "",
    message: "",
    otp: "",
    otpVerified: false,
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});
  // State to manage form submission status
  const [submitted, setSubmitted] = useState(false);
  // State to manage OTP sent status
  const [otpSent, setOtpSent] = useState(false);

  /**
   * Validates the email format.
   * @param {string} email - The email address to validate.
   * @returns {boolean} - Returns true if the email format is valid, otherwise false.
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Sends an OTP to the provided email address.
   * Validates the email before sending the OTP.
   */
  const handleSendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: "Invalid Email format" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3069/send-otp", {
        email: formData.email,
      });
      setOtpSent(true);
      console.log("Response from backend:", response.data);
      alert(response.data.message);
    } catch (err) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      alert("Failed to send OTP. Check logs for details.");
    }
  };

  /**
   * Verifies the OTP entered by the user.
   */
  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:3069/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      setFormData({ ...formData, otpVerified: true });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to verify OTP");
    }
  };

  /**
   * Handles the form submission.
   * Validates the form data before submitting.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid Email format";
    if (!formData.otpVerified) newErrors.otp = "Please verify email OTP";
    if (!formData.inquiryType)
      newErrors.inquiryType = "Please select an inquiry type";
    if (!formData.message) newErrors.message = "Message is required";
    else if (formData.message.length > 500)
      newErrors.message = "Message exceeds 500 characters";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        // Submit the inquiry form
        const response = await axios.post(
          "http://ugdev.cs.smu.ca:3069/send-confirmation",
          {
            email: formData.email,
            fullName: formData.fullName,
            inquiryType: formData.inquiryType,
            message: formData.message,
          }
        );

        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          inquiryType: "",
          message: "",
          otp: "",
          otpVerified: false,
        });

        alert(response.data.message); // Show success message for email confirmation
      } catch (err) {
        console.error(
          "Error sending confirmation email:",
          err.response?.data || err.message
        );
        alert("Failed to send confirmation email.");
      }
    }
  };

  /**
   * Handles changes to form input fields.
   * @param {Event} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg dark:bg-dark-background">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Inquiry Form
      </h2>

      {submitted && (
        <div className="text-green-600 mb-4">
          Your form has been submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block font-medium text-gray-700">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full rounded-md border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <span className="text-red-500">{errors.fullName}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={handleSendOtp}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
          >
            Send OTP
          </button>
          {otpSent && (
            <div>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md"
              >
                Verify OTP
              </button>
            </div>
          )}
          {errors.email && <span className="text-red-500">{errors.email}</span>}
          {errors.otp && <span className="text-red-500">{errors.otp}</span>}
        </div>
        <div>
          <label
            htmlFor="inquiryType"
            className="block font-medium text-gray-700"
          >
            Inquiry Type:
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className={`mt-1 p-2 block w-full rounded-md border ${
              errors.inquiryType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select an option</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Site Visit Request">Site Visit Request</option>
            <option value="Burial Service Query">Burial Service Query</option>
          </select>
          {errors.inquiryType && (
            <span className="text-red-500">{errors.inquiryType}</span>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block font-medium text-gray-700">
            Message (500 characters max):
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            maxLength="500"
            className={`mt-1 p-2 block w-full rounded-md border ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.message && (
            <span className="text-red-500">{errors.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
