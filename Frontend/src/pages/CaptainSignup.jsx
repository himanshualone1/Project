import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vehicleType: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    // Update password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else if (formData.firstname.length < 2) {
      newErrors.firstname = "First name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.vehicleType) {
      newErrors.vehicleType = "Vehicle type is required";
    }

    if (!formData.vehicleColor.trim()) {
      newErrors.vehicleColor = "Vehicle color is required";
    }

    if (!formData.vehiclePlate.trim()) {
      newErrors.vehiclePlate = "Vehicle plate number is required";
    }

    if (!formData.vehicleCapacity) {
      newErrors.vehicleCapacity = "Vehicle capacity is required";
    } else if (formData.vehicleCapacity < 1) {
      newErrors.vehicleCapacity = "Capacity must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setErrorMsg("");

    const payload = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
        capacity: Number(formData.vehicleCapacity),
        vehicleType: formData.vehicleType,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/captains/register",
        payload
      );

      if (response.data.token) {
        localStorage.setItem("captainToken", response.data.token);
      }

      setSuccess(true);

      // auto redirect after 3 seconds
      setTimeout(() => {
        navigate("/captain-login");
      }, 3000);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Captain registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center p-2 sm:p-4 md:p-6">
      <div className="bg-white w-full max-w-[480px] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header with Orange Gradient */}
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full -ml-10 sm:-ml-12 -mb-10 sm:-mb-12"></div>
          
          <div className="relative z-10">
            <button
              onClick={() => {
                if (currentStep === 2 && !success) {
                  setCurrentStep(1);
                } else {
                  navigate(-1);
                }
              }}
              className="mb-4 sm:mb-6 p-2 rounded-xl hover:bg-white/20 text-white transition-all inline-flex items-center justify-center w-10 h-10"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-xl sm:text-2xl block">GoCab Captain</span>
                <span className="text-orange-100 text-xs sm:text-sm">Driver Registration</span>
              </div>
            </div>

            {!success && (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                  {currentStep === 1 ? "Join Our Fleet" : "Vehicle Details"}
                </h1>
                <p className="text-orange-100 text-sm sm:text-base">
                  {currentStep === 1 ? "Start earning as a GoCab captain" : "Tell us about your vehicle"}
                </p>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 mt-4 sm:mt-6">
                  <div className={`flex-1 h-1.5 rounded-full transition-all ${currentStep >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
                  <div className={`flex-1 h-1.5 rounded-full transition-all ${currentStep >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                </div>
                <p className="text-orange-100 text-xs mt-2">Step {currentStep} of 2</p>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 max-h-[calc(100vh-280px)] overflow-y-auto">
          
          {/* ✅ SUCCESS UI */}
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                Welcome Aboard! 🎉
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-sm mx-auto">
                Your captain account has been created successfully. Get ready to start earning!
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/captain-login")}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Go to Login
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                <p className="text-sm text-gray-500">Redirecting automatically in 3 seconds...</p>
              </div>
            </div>
          ) : (
            /* 📝 FORM UI */
            <div>
              {errorMsg && (
                <div className="mb-4 sm:mb-6 flex items-start gap-3 bg-red-50 border-2 border-red-200 text-red-700 p-3 sm:p-4 rounded-xl">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">Registration Failed</p>
                    <p className="text-sm mt-1">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={currentStep === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* STEP 1: Personal Information */}
                {currentStep === 1 && (
                  <>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          First Name *
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="John"
                            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all ${
                              errors.firstname 
                                ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            } outline-none`}
                          />
                        </div>
                        {errors.firstname && (
                          <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.firstname}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="captain@gocab.com"
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all ${
                            errors.email 
                              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                              : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          } outline-none`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all ${
                            errors.password 
                              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                              : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          } outline-none`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          {showPassword ? (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4].map((level) => (
                              <div
                                key={level}
                                className={`h-1.5 flex-1 rounded-full transition-all ${
                                  level <= passwordStrength ? getPasswordStrengthColor() : "bg-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          {passwordStrength > 0 && (
                            <p className={`text-xs font-medium ${
                              passwordStrength === 1 ? "text-red-600" :
                              passwordStrength === 2 ? "text-yellow-600" :
                              passwordStrength === 3 ? "text-blue-600" :
                              "text-green-600"
                            }`}>
                              Password strength: {getPasswordStrengthText()}
                            </p>
                          )}
                        </div>
                      )}

                      {errors.password && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Next: Vehicle Details
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </>
                )}

                {/* STEP 2: Vehicle Information */}
                {currentStep === 2 && (
                  <>
                    {/* Vehicle Type */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                        Vehicle Type *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <select
                          name="vehicleType"
                          value={formData.vehicleType}
                          onChange={handleChange}
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all ${
                            errors.vehicleType 
                              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                              : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          } outline-none appearance-none`}
                        >
                          <option value="">Select vehicle type</option>
                          <option value="Car">🚗 Car</option>
                          <option value="Motorcycle">🏍️ Motorcycle</option>
                          <option value="Auto">🛺 Auto Rickshaw</option>
                        </select>
                        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.vehicleType && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.vehicleType}
                        </p>
                      )}
                    </div>

                    {/* Vehicle Color & Capacity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          Color *
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            name="vehicleColor"
                            value={formData.vehicleColor}
                            onChange={handleChange}
                            placeholder="e.g., White"
                            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all ${
                              errors.vehicleColor 
                                ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            } outline-none`}
                          />
                        </div>
                        {errors.vehicleColor && (
                          <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.vehicleColor}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                          Capacity *
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <input
                            type="number"
                            name="vehicleCapacity"
                            value={formData.vehicleCapacity}
                            onChange={handleChange}
                            placeholder="e.g., 4"
                            min="1"
                            className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all ${
                              errors.vehicleCapacity 
                                ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                                : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            } outline-none`}
                          />
                        </div>
                        {errors.vehicleCapacity && (
                          <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.vehicleCapacity}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Plate Number */}
                    <div>
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 block">
                        License Plate Number *
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="vehiclePlate"
                          value={formData.vehiclePlate}
                          onChange={handleChange}
                          placeholder="e.g., ABC-1234"
                          className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 transition-all uppercase ${
                            errors.vehiclePlate 
                              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100" 
                              : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          } outline-none`}
                        />
                      </div>
                      {errors.vehiclePlate && (
                        <p className="text-xs sm:text-sm text-red-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.vehiclePlate}
                        </p>
                      )}
                    </div>

                    {/* Terms */}
                    <div className="bg-orange-50 rounded-xl p-3 sm:p-4 border border-orange-200">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          required
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-orange-500 focus:ring-2 focus:ring-orange-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          I confirm that all vehicle information is accurate and I agree to GoCab's{" "}
                          <Link to="/terms" className="text-orange-600 font-semibold hover:underline">
                            Terms of Service
                          </Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Registering...
                          </>
                        ) : (
                          <>
                            Complete Registration
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}

                {/* Login Link */}
                {currentStep === 1 && (
                  <p className="text-center text-gray-600 text-xs sm:text-sm pt-2">
                    Already a captain?{" "}
                    <Link to="/captain-login" className="font-bold text-gray-900 hover:text-orange-600 transition-colors">
                      Sign in
                    </Link>
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;