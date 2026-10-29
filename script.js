
import { sendMessage } from "./firebase.js";

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const button = document.getElementById("submitButton");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const message = form.elements["message"].value;

  button.disabled = true;
  button.textContent = "Sending...";
  status.textContent = "Submitting your message...";

  try {
    await sendMessage(name, email, message);

    status.textContent = "Message sent successfully!";
    form.reset();
  } catch (error) {
    console.error("Contact form error:", error);

    if (
      error.code === "permission-denied" ||
      error.code === "firestore/permission-denied"
    ) {
      status.textContent =
        "Submission blocked by database permissions. Check Firestore Rules.";
    } else {
      status.textContent =
        error.message || "Could not send your message. Please try again.";
    }
  } finally {
    button.disabled = false;
    button.textContent = "Send Message";
  }
});
