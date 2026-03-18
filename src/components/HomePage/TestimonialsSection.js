import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TESTIMONIALS = [
  {
    name: "John Doe",
    company: "ABC Pvt Ltd",
    quote: "Our sales increased by 40% after working with them!",
    image: "https://i.pravatar.cc/100?img=1",
    stars: 5,
  },
  {
    name: "Sarah Smith",
    company: "Tech Corp",
    quote: "Amazing service and 100% professional team.",
    image: "https://i.pravatar.cc/100?img=2",
    stars: 5,
  },
  {
    name: "David Lee",
    company: "Startup Hub",
    quote: "They helped us scale our app by 60%.",
    image: "https://i.pravatar.cc/100?img=3",
    stars: 4,
  },
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  // ✅ Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="content-section-new bg-light py-5">
      <div className="container text-center">

        <h2>Trusted by Businesses Worldwide</h2>
        <p>Real results from our clients</p>

        <div className="testimonial-slider-new mt-4">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="testimonial-card-new"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <FaQuoteLeft className="quote-icon-new" />

              {/* ✅ FIXED */}
              <p
                className="quote-new"
                dangerouslySetInnerHTML={{
                  __html: `"${TESTIMONIALS[currentTestimonial].quote.replace(
                    /(\d+%)/g,
                    "<strong>$1</strong>"
                  )}"`,
                }}
              />

              <div className="client-info-new">
                <img
                  src={TESTIMONIALS[currentTestimonial].image}
                  alt={TESTIMONIALS[currentTestimonial].name}
                  className="rounded-circle mb-2"
                />

                <div className="stars-new">
                  {[...Array(TESTIMONIALS[currentTestimonial].stars)].map(
                    (_, i) => (
                      <FaStar key={i} />
                    )
                  )}
                </div>

                <h5>{TESTIMONIALS[currentTestimonial].name}</h5>
                <p>{TESTIMONIALS[currentTestimonial].company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="testimonial-nav-new mt-3">
            <button onClick={prevTestimonial}>
              <FaChevronLeft />
            </button>
            <button onClick={nextTestimonial}>
              <FaChevronRight />
            </button>
          </div>

          {/* Progress bar */}
          <div className="testimonial-progress-bar mt-3">
            <motion.div
              key={currentTestimonial}
              className="testimonial-progress-bar-inner"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;