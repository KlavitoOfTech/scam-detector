import {
  Mail,
  MessageCircle,
  X,
  Send
} from "lucide-react";

function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="contact-card">

        <span className="contact-badge">
          Get in Touch
        </span>

        <h2>Contact Our Team</h2>

        <p className="contact-subtext">
          Reach out for support or partnerships.
        </p>

        <div className="contact-grid">

          {/* Email (valid) */}
          <a
            href="mailto:trustscan@email.com"
            className="contact-item"
          >
            <Mail size={32} />
            Email
          </a>

          {/* WhatsApp (fixed) */}
          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <MessageCircle size={32} />
            WhatsApp
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <X size={32} />
            X (Twitter)
          </a>

          {/* Telegram */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <Send size={32} />
            Telegram
          </a>

        </div>

      </div>

    </section>
  );
}

export default Contact;