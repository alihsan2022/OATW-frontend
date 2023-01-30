import React, { useEffect, useState } from "react";
import "../../Components/Homepage/FAQ.css";
import FaqQuestion from "../../Components/Homepage/FaqQuestion";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

const FAQPageFAQ = () => {
  const navigate = useNavigate();
  const data = {
    rows: [
      {
        title: "How does child sponsorship work?",
        content: `Al-Ihsan Foundation provides orphan sponsorship to help children who have lost either one and/or both parents and who have been affected by war, poverty or disability.

Through your generous sponsorship, Al-Ihsan Foundation is able to assist the families and communities access the necessities of food, safe drinking water, improved health care, shelter and education.

`,
      },

      {
        title: "How do I make sponsorship payments?",
        content: `There are several payment methods you can sponsor a child. This can be via: Credit Card, Paypal or through EziDebit. Cash and Cheque is not available for payments for child sponsorships. `,
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
      {
        title: "How do I make a sponsorship payment?",
        content: (
          <p>
            There are several payment methods you can sponsor a child. This can
            be via: Credit Card, Paypal or through EziDebit. Cash and Cheque is
            not available for payments for child sponsorships.
          </p>
        ),
      },
      {
        title: "What if my payment has failed?",
        content: (
          <p>
            Failed payments will allow the child to be up for sponsorship.
            Please make sure that your payment details are up to date and also
            that there are available funds to be transferred for sponsorship.
          </p>
        ),
      },
      {
        title: "What if I cancel my sponsorship?",
        content: (
          <p>
            All sponsors are encouraged to view the sponsorship as a long-term
            commitment as the orphans depend on sponsorship. A sponsor can
            cancel or adjust their sponsorship at any time by contacting the
            staff at Al-Ihsan Foundation If you need to cancel your sponsorship,
            please contact 1300 998 444.
          </p>
        ),
      },
      {
        title: "Does Al-Ihsan Foundation only help muslims.",
        content: (
          <p>
            Al-Ihsan Foundation was established on Islamic ethics and values.
            The sponsorship is completely inclusive, regardless of ethnicity,
            religion, gender, disabilities, culture or beliefs.
          </p>
        ),
      },
      {
        title: "Does my child sponsorship only help the child alone?",
        content: (
          <p>
            Your sponsorship will not only help to change the life of your
            sponsored child by providing food and nutrition, clean drinking
            water, housing and shelter and access to education but it will also
            assist their family and the entire community.
          </p>
        ),
      },
      {
        title: "How long does child sponsorship last?",
        content: (
          <p>
            Once Children become Adults child sponsorship is no longer available
            for the Child. You will be notified of any changes to the child
            sponsorship.
          </p>
        ),
      },
      {
        title: "Can my sponsored child visit me or can I vist them?",
        content: (
          <p>
            For Child safety and protection, sponsors are not able to visit the
            homes of their sponsored children.
          </p>
        ),
      },
      {
        title: "Child safety policy.",
        content: (
          <p>
            Al-Ihsan Foundation is completely committed to conducting our
            programs in a manner which is both safe for the children we serve
            and help protect the children with whom we are in contact with. All
            e-letter messages are moderated between the sponsor and the
            child/orphanage by head office. For security and safety of both
            parties, No personal details or intimate messages can be exchanged
            between Child and Sponsor.
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
    </div>
  );
};

export default FAQPageFAQ;
