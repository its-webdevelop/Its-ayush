const SUPABASE_URL = "https://jkmlmtqkkkzsdalnjoha.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_VP7DuOiHdAoPWEIoWNrMTg_Lf63_mmt";

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const button = document.getElementById("submitButton");

if (form && status && button) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const name = form.elements["name"]?.value.trim();
    const email = form.elements["email"]?.value.trim();
    const message = form.elements["message"]?.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all required fields.";
      return;
    }

    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "Submitting your message...";

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          full_name: name,
          email: email,
          project_type: "Contact Message",
          project_description: message
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        console.error("Supabase submission failed:", {
          status: response.status,
          error
        });

        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "Database permission denied. Check your Supabase API key, table permissions, and RLS policy."
          );
        }

        if (response.status === 404) {
          throw new Error(
            "Supabase table or API endpoint not found. Check the leads table and Data API settings."
          );
        }

        throw new Error(
          error.message || `Unable to send your message (HTTP ${response.status}).`
        );
      }

      status.textContent = "Message sent successfully!";
      form.reset();

    } catch (error) {
      console.error("Contact form error:", error);
      status.textContent =
        error.message || "Could not send your message. Please try again.";

    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  });
} else {
  console.error(
    "Contact form elements not found. Check contactForm, formStatus, and submitButton IDs in index.html."
  );
}
