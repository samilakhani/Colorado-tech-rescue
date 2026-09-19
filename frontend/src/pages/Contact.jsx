import React, { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { business, serviceCategories } from "../data/siteConfig.js";
import "./Contact.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialState = {
  name: "",
  phone: "",
  email: "",
  serviceType: "",
  deviceType: "",
  manufacturerModel: "",
  serviceLocation: "In-Shop Drop-Off",
  preferredDate: "",
  preferredTime: "",
  problemDescription: "",
  message: "",
  website: "", // honeypot — stays empty for real visitors
};

// Resizes/compresses a photo in the browser before it's sent, so a full-size
// phone photo doesn't get sent as a multi-megabyte request.
function compressImage(file, maxDimension = 1280, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [submitState, setSubmitState] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please choose an image file for the photo.");
      return;
    }
    try {
      const compressed = await compressImage(file);
      setPhotoData(compressed);
      setPhotoPreview(compressed);
      setPhotoName(file.name);
    } catch {
      setErrorMessage("We couldn't process that photo — you can still submit without it.");
    }
  };

  const removePhoto = () => {
    setPhotoData(null);
    setPhotoPreview(null);
    setPhotoName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState("sending");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photoBase64: photoData,
          photoFileName: photoName,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSubmitState("success");
      setForm(initialState);
      removePhoto();
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err.message || "We couldn't send your request. Please call or text us instead.");
    }
  };

  if (submitState === "success") {
    return (
      <>
        <PageHero
          eyebrow="Contact Us"
          title="Request sent"
          description="Thanks for reaching out — we'll follow up shortly to confirm your appointment."
        />
        <section className="section">
          <div className="container contact-success">
            <div className="panel">
              <h2>We've received your request</h2>
              <p>
                A confirmation has been sent to <strong>{business.email}</strong>. We'll contact you
                by phone or email to confirm a time — until then, this is an <em>appointment
                request</em>, not a guaranteed booking.
              </p>
              <p>Need something faster? Call or text us directly.</p>
              <a href={business.phoneHref} className="btn btn-primary">
                Call {business.phone}
              </a>
              <button className="btn btn-outline" onClick={() => setSubmitState("idle")}>
                Send another request
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Request an appointment"
        description="Tell us about your device and the problem you're having. We'll review your request and follow up to confirm a time — either in-shop or at your home."
      />

      <section className="section">
        <div className="container contact-layout">
          <form className="panel contact-form" onSubmit={handleSubmit}>
            {/* Honeypot field — hidden from real visitors via CSS, bots often fill it in */}
            <div className="contact-form__honeypot" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="name">Full name *</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} />
              </div>
              <div className="contact-form__field">
                <label htmlFor="phone">Phone number *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">Email address *</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} />
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="serviceType">Service needed</label>
                <select id="serviceType" name="serviceType" value={form.serviceType} onChange={handleChange}>
                  <option value="">Select a service</option>
                  {serviceCategories.map((cat) => (
                    <option key={cat.id} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                  <option value="Not sure / Other">Not sure / Other</option>
                </select>
              </div>
              <div className="contact-form__field">
                <label htmlFor="deviceType">Device type</label>
                <input
                  id="deviceType"
                  name="deviceType"
                  type="text"
                  placeholder="Laptop, desktop, phone, tablet…"
                  value={form.deviceType}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="manufacturerModel">Manufacturer / model (if known)</label>
              <input
                id="manufacturerModel"
                name="manufacturerModel"
                type="text"
                placeholder="e.g. Dell XPS 13, iPhone 13"
                value={form.manufacturerModel}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__field">
              <span className="contact-form__label-static">Preferred location</span>
              <div className="contact-form__radio-group">
                <label>
                  <input
                    type="radio"
                    name="serviceLocation"
                    value="In-Shop Drop-Off"
                    checked={form.serviceLocation === "In-Shop Drop-Off"}
                    onChange={handleChange}
                  />
                  In-shop drop-off
                </label>
                <label>
                  <input
                    type="radio"
                    name="serviceLocation"
                    value="In-Home Service"
                    checked={form.serviceLocation === "In-Home Service"}
                    onChange={handleChange}
                  />
                  In-home service
                </label>
              </div>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="preferredDate">Preferred date</label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={form.preferredDate}
                  onChange={handleChange}
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="preferredTime">Preferred time</label>
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={form.preferredTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="problemDescription">Describe the problem *</label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                rows={4}
                required
                value={form.problemDescription}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="photo">Add a photo (optional)</label>
              <input id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
              {photoPreview && (
                <div className="contact-form__photo-preview">
                  <img src={photoPreview} alt="Selected upload preview" />
                  <button type="button" className="contact-form__photo-remove" onClick={removePhoto}>
                    Remove photo
                  </button>
                </div>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="message">Anything else we should know?</label>
              <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange} />
            </div>

            {submitState === "error" && <p className="contact-form__error">{errorMessage}</p>}

            <button type="submit" className="btn btn-primary btn-block" disabled={submitState === "sending"}>
              {submitState === "sending" ? "Sending…" : "Submit Request"}
            </button>

            <p className="contact-form__note">
              This is an appointment <strong>request</strong>. We'll follow up by phone or email to
              confirm before it's scheduled.
            </p>
          </form>

          <aside className="contact-sidebar">
            <div className="panel contact-sidebar__card">
              <h3>Prefer to talk directly?</h3>
              <a href={business.phoneHref} className="contact-sidebar__link">
                {business.phone}
              </a>
              <a href={business.emailHref} className="contact-sidebar__link">
                {business.email}
              </a>
            </div>
            <div className="panel contact-sidebar__card">
              <h3>Hours</h3>
              <ul className="contact-sidebar__hours">
                {business.hours.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel contact-sidebar__card">
              <h3>Service area</h3>
              <p>{business.serviceArea}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
