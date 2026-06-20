import React from 'react';
import { Heart, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="app-footer" id="app-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-author">
            <Heart size={16} className="footer-heart" />
            <span className="footer-name">Shruti Srivastava</span>
          </div>
          <a
            href="mailto:sri.shruti24@gmail.com"
            className="footer-email"
            id="footer-email-link"
          >
            <Mail size={14} />
            sri.shruti24@gmail.com
          </a>
        </div>

        <div className="footer-cta">
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-digital-heroes"
            id="digital-heroes-btn"
          >
            Built for Digital Heroes
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="footer-copy">
          <span>&copy; {new Date().getFullYear()} KanbanBoard. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
