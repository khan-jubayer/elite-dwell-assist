import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import imggg from "../../images/login.jpg";
import Select from "react-select";

const CustomerRegistrationForm = () => {
  const [selectedGender, setSelectedGender] = useState([]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const imageStorageKey = "81a2b36646ff008b714220192e61707d";
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const navigate = useNavigate();

  let signInError;

  if (loading || updating) {
    return <Loading></Loading>;
  }

  if (error || updateError) {
    signInError = (
      <p className="text-red-500 text-xs mt-1">
        {error?.message || updateError?.message}
      </p>
    );
  }

  const handleAddCustomer = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    await updateProfile({
      displayName: data.name,
      role: "customer",
      address: data.address,
      contact: data.contact,
      password: data.password,
      dob: data.dob,
    });
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const customer = {
            name: data.name,
            email: data.email,
            role: "customer",
            address: data.address,
            contact: data.contact,
            gender: selectedGender ? selectedGender.value : null,
            dob: data.dob,
            password: data.password,
            img: imgData.data.url,
          };
          const user = {
            name: data.name,
            email: data.email,
            role: "customer",
            dob: data.dob,
            password: data.password,
            img: imgData.data.url,
          };

          // save customer information to the database
          fetch("http://localhost:5000/customer", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(customer),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} thanks for your registration`);
            });
          fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} welcome to Elite-Dwell-Assist`);
            });
        }
      });
    navigate("/");
  };

  const handleGender = (selected) => {
    setSelectedGender(selected);
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="bg-slate-100 pb-12 pt-16">
      <div className="mx-auto max-w-5xl">
        <div className="card bg-transparent border-primary border-2 shadow-xl">
          <div className="flex">
            <div>
              <img className="h-full" src={imggg} alt="" />
            </div>

            <div className="card-body">
              <h1
                style={{ fontFamily: "arial" }}
                className="text-center text-2xl text-blue-700 font-extrabold"
              >
                Register as <strong>CUSTOMER</strong>
              </h1>
              <form onSubmit={handleSubmit(handleAddCustomer)}>
                <div className="grid grid-cols-2 pt-5 gap-3">
                  {/* name field */}
                  <div className="form-control  w-full">
                    <label className="label">
                      <span className="label-text text-blue-700 font-bold text-md">
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      className="input input-sm input-bordered w-full"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                    <label>
                      {errors.name?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.name.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* email field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-blue-700 font-bold text-md">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your email"
                      name="email"
                      className="input input-sm input-bordered w-full "
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid email",
                        },
                      })}
                    />
                    <label>
                      {errors.email?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === "pattern" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 pt-5 gap-3">
                  {/* address */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-blue-700 font-bold text-md">
                        Address
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your address"
                      name="address"
                      className="input input-sm input-bordered w-full"
                      {...register("address", {
                        required: {
                          value: true,
                          message: "Address is required",
                        },
                      })}
                    />
                    <label>
                      {errors.address?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.address.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* contact field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-blue-700 font-bold text-md">
                        Contact
                      </span>
                    </label>
                    <input
                      type="digit"
                      placeholder="Your Contact number"
                      name="contact"
                      className="input input-sm input-bordered w-full "
                      {...register("contact", {
                        required: {
                          value: true,
                          message: "contact is required",
                        },
                        pattern: {
                          value: /[0-9]*/,
                          message:
                            " Your Contact number should have digits only",
                        },
                        minLength: {
                          value: 11,
                          message: "Provide a valid contact",
                        },
                        maxLength: {
                          value: 11,
                          message: "Provide a valid contact",
                        },
                      })}
                    />
                    <label>
                      {errors.contact?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.contact.message}
                        </span>
                      )}
                      {errors.contact?.type === "pattern" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.contact.message}
                        </span>
                      )}
                      {errors.contact?.type === "minLength" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.contact.message}
                        </span>
                      )}
                      {errors.contact?.type === "maxLength" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.contact.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 pt-5 gap-3">
                  {/* Gender field */}
                  {/* Gender field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-left text-blue-700 font-bold text-xs">
                        Gender
                      </span>
                    </label>
                    <Select
                      value={selectedGender}
                      options={genderOptions}
                      onChange={handleGender}
                      isSearchable={false}
                      placeholder="Select Gender"
                    />
                  </div>
                  {/* dob */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-blue-700 font-bold text-md">
                        Date of Birth
                      </span>
                    </label>{" "}
                    <input
                      type="text"
                      placeholder="yyyy--mm-dd"
                      name="dob"
                      className="input input-sm input-bordered w-full "
                      {...register("dob", {
                        required: {
                          value: true,
                          message: "DOB is required",
                        },
                        pattern: {
                          value:
                            /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                          message: "Follow yyyy--mm-dd format",
                        },
                      })}
                    />
                    <label>
                      {errors.dob?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.dob.message}
                        </span>
                      )}
                      {errors.dob?.type === "pattern" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.dob.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                {/* Image upload field */}
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text text-blue-700 font-bold text-md">
                      Photo
                    </span>
                  </label>
                  <input
                    type="file"
                    placeholder="Your image"
                    name="image"
                    className="input input-sm input-bordered w-full"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "image is required",
                      },
                    })}
                  />
                  <label>
                    {errors.image?.type === "required" && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.image.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="grid grid-cols-2 pt-5 gap-3">
                  {/* Password field */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        New Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="input input-sm input-bordered w-full"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Must be 6 characters or longer",
                        },
                      })}
                    />
                    <label>
                      {errors.password?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.password.message}
                        </span>
                      )}
                      {errors.password?.type === "minLength" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                  </div>

                  {/* Confirm Password field */}
                  <div className="form-control w-full pb-11">
                    <label className="label">
                      <span className="label-text text-primary font-bold text-md">
                        Confirm Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      className="input input-sm input-bordered w-full"
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Password confirmation is required",
                        },
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match", // Check if it matches the "password" field
                      })}
                    />
                    <label>
                      {errors.confirmPassword?.type === "required" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                      {errors.confirmPassword?.type === "validate" && (
                        <span className="text-red-500 text-xs mt-1">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
                {signInError}
                <div className="flex items-center justify-center">
                  <input
                    className="btn btn-sm text-xs w-1/3  border-blue-500 text-white font-bold bg-primary"
                    value="REGISTER"
                    type="submit"
                  />
                </div>
                {/* {loading && <div>Loading...</div>} */}
              </form>
              <p className="text-center">
                <small className="font-semibold">
                  Already have an account at elite-dwell-assist?
                  <Link className="text-blue-700" to="/login">
                    Login
                  </Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistrationForm;
