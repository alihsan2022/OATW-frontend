import React, { useEffect, useState } from "react";
import "./FAQ.css";
import FaqQuestion from "./FaqQuestion";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
  const navigate = useNavigate();
  const data = {
    rows: [
      {
        title: "How does child sponsorship work?",
        content: (
          <p>
            Al-Ihsan Foundation provides orphan sponsorship to help children who
            have lost either one and/or both parents and who have been affected
            by war, poverty or disability.Through your generous sponsorship,
            Al-Ihsan Foundation is able to assist the families and communities
            access the necessities of food, safe drinking water, improved health
            care, shelter and education.
          </p>
        ),
      },

      {
        title: "How do I make sponsorship payments?",
        content: (
          <p>
            There are several payment methods you can sponsor a child. This can
            be via: Credit Card, Paypal or through EziDebit. Cash and Cheque is
            not available for payments for child sponsorships.
          </p>
        ),
      },

      {
        title: "Will I sponsor an actual child?",
        content: (
          <p>
            By sponsoring a child through Al-Ihsan Foundation, you will be
            supporting a child and his/her family. Your sponsorship will not
            only help to change the life of your sponsored child by providing
            food and nutrition, clean drinking water, housing and shelter and
            access to education but it will also assist their family and the
            entire community.
          </p>
        ),
      },
      {
        title: "Are sponsorship payments tax deductible.",
        content: (
          <p>
            Yes, 100% of payments made to Orphans Around The World are tax
            deductible.
          </p>
        ),
      },
      {
        title: "What is orphan sponsorship?",
        content: (
          <p>
            Al-Ihsan Foundation provides orphan sponsorship to help children who
            have lost either one and/or both parents and who have been affected
            by war, poverty or disability. Through your generous sponsorship,
            Al-Ihsan Foundation is able to assist the families and communities
            access the necessities of food, safe drinking water, improved health
            care, shelter and education.
          </p>
        ),
      },
    ],
  };

  return (
    <div className="faq-section">
      <div className="faq-header">
        <h2>Frequently asked questions</h2>
        <h4>Child sponsorship: what's it all about?</h4>
      </div>
      <div className="faq-container">
        {data.rows.map((question, index) => (
          <FaqQuestion
            key={index}
            title={question.title}
            content={question.content}
          />
        ))}
      </div>
      <div className="faqPage-redirect">
        <button
          onClick={() => navigate("/FAQPage")}
          className="faqPage-redirect_btn"
        >
          More FAQs
        </button>
      </div>
    </div>
  );
};

export default FAQ;
