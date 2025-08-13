/* ===========================
   Helpers & Element Queries
=========================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const mobileToggle = $("#mobileToggle");
const navMenu = $("#navMenu");

const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");
const modalClose = $("#modalClose");

const contactForm = $("#contactForm");
const formMessage = $("#formMessage");

const homeSection = $(".home");
const heroTitle = $(".home h1");
const originalText = heroTitle ? heroTitle.textContent : "";

let theoryBrowserBound = false;
let planScrollPositions = {};

/* ===========================
   Mobile Menu Toggle
=========================== */
if (mobileToggle && navMenu) {
  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* ===========================
   Smooth Scrolling (Nav & Back-to-Top)
=========================== */
$$(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = targetId ? $(targetId) : null;

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile menu if open
    if (navMenu) navMenu.classList.remove("active");
  });
});

// Back to top functionality
const backToTop = $(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    const topTarget = $("#home");
    if (topTarget) {
      topTarget.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* ===========================
   Scroll Animations
=========================== */
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, observerOptions);

$$(".section").forEach((section) => sectionObserver.observe(section));

/* ===========================
   Modal: Portfolio Projects
=========================== */
function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("show")) {
    closeModal();
  }
});

/* ===========================
   Lesson Plan Loading & Formatting
=========================== */
async function loadLessonPlan(fileName) {
  try {
    const response = await fetch(`lesson-plans/${fileName}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    return formatLessonPlan(text);
  } catch (err) {
    console.error("Error loading lesson plan:", err);
    return "<p>Error loading lesson plan. Please try again later.</p>";
  }
}

function formatLessonPlan(text) {
  // Convert plain text to HTML with simple markdown-like rules
  let html = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold**
    .replace(
      /^(\*\*.*?\*\*)/gm,
      '<h4 style="color:#1a2e49; margin: 1.5rem 0 0.5rem 0;">$1</h4>'
    ) // heading line
    .replace(/^-\s+(.+)/gm, "<li>$1</li>") // bullets
    .replace(/^\d+\.\s+(.+)/gm, "<li>$1</li>") // numbered list
    .replace(/\n\n/g, "</p><p>") // paragraphs
    .replace(/^(?!<[hl]|<li)(.+)/gm, "<p>$1</p>") // wrap lines in <p> if not list/heading
    .replace(/<p><\/p>/g, "") // remove empty paragraphs
    .replace(/(<li>.*<\/li>)/gs, (m) => "<ul>" + m + "</ul>"); // wrap list items in <ul>

  // Cleanup
  html = html
    .replace(/<p><h4/g, "<h4")
    .replace(/<\/h4><\/p>/g, "</h4>")
    .replace(/<p><ul>/g, "<ul>")
    .replace(/<\/ul><\/p>/g, "</ul>");

  return html;
}

/* ===========================
   Project Data
=========================== */
const projectData = {
  1: {
    title: "Instructional Media & Content Creation",
    content: `
      <h3>Overview</h3>
      <p>I create multimedia instructional materials including presentations, videos, infographics, and podcasts that translate complex ideas into clear, engaging learning assets. Work spans MS PowerPoint and Canva decks, narrated and edited videos in iMovie, data-informed infographics, and short-form audio episodes for concept reinforcement.</p>

      <h3>Formats & Deliverables</h3>
      <ul>
        <li><strong>Presentations:</strong> Slide decks for live or asynchronous delivery (PowerPoint, Canva)</li>
        <li><strong>Video:</strong> Narrated and edited instructional videos (iMovie)</li>
        <li><strong>Infographics:</strong> Concept maps, workflows, and process visuals (Canva, Adobe Photoshop)</li>
        <li><strong>Podcasts:</strong> Short instructional audio with intro/outro, music beds, and leveling (Audacity, Adobe Audition)</li>
      </ul>

      <h3>Process</h3>
      <ul>
        <li>Define audience and learning objectives; outline key takeaways</li>
        <li>Script/storyboard; select visual system and pacing</li>
        <li>Design for accessibility (contrast, alt text, readable type, captions/transcripts)</li>
      </ul>

      <h3>Impact</h3>
      <ul>
        <li>Improved clarity and engagement with consistent visuals and narrative pacing</li>
        <li>Reusable assets for courses, workshops, and faculty development</li>
        <li>Accessible deliverables (captions, transcripts, alt text) ready for LMS</li>
      </ul>

      <h3>Technologies Used</h3>
      <p>PowerPoint, Canva, iMovie, Audacity, Audition, Photoshop</p>

      <h3>Sample Assets</h3>

      <p style="margin-bottom: 0.5rem;">Presentation Preview (click to open):</p>
      <a href="documents/Normal_Distribution.pdf" target="_blank">
        <img src="images/normal-presentation.png" alt="Presentation preview" style="width:100%; border-radius:8px; margin-bottom:1rem;" />
      </a>

      <p style="margin-bottom: 0.5rem;">Video Preview (click to open):</p>
      <a href="https://www.youtube.com/watch?v=M4sNwW1OBSs" target="_blank">
        <img src="images/SDT-video.png" alt="Video preview" style="width:100%; border-radius:8px; margin-bottom:1rem;" />
      </a>
      
      <p style="margin-bottom: 0.5rem;">Infographic Preview (click to open collection):</p>
      <a href="documents/Infographic_Collection.pdf" target="_blank">
        <img src="images/infographic-collage.png" alt="Infographic preview" style="width:100%; border-radius:8px; margin-bottom:1rem;" />
      </a>

      <p style="margin-bottom: 0.5rem;">Podcast Excerpt:</p>
      <audio controls style="width:100%; margin-bottom:1rem;">
        <source src="documents/Podcast_Excerpt.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `,
  },
  2: {
    title: "OER Chapter on Self-Determination Theory (SDT)",
    content: `
      <h3>Project Overview</h3>
      <p>As a PhD student, I contributed a chapter on Self-Determination Theory (SDT) to an open-access textbook for students in instructional design. The book, published by Dr. Theresa Huff at Idaho State University, introduces key learning theories and their practical applications in education and training settings.</p>

      <h3>Learning Objectives</h3>
      <ul>
        <li>Explain the three core psychological needs that drive motivation in SDT.</li>
        <li>Apply SDT principles to instructional design decisions for online and blended learning.</li>
        <li>Connect theory to real-world examples of learner engagement and autonomy support.</li>
      </ul>

      <h3>Why It Matters</h3>
      <p>This chapter helps bridge the gap between theory and instructional practice. It provides educators, designers, and future practitioners with an accessible explanation of how motivation impacts learning, and how thoughtful design can support student success.</p>
      
      <h3>Technologies Used</h3>
      <p>Pressbooks, OER, Creative Commons, H5P</p>

      <h3>View Chapter</h3>
      <p>
        <a href="https://isu.pressbooks.pub/thuff/chapter/self-determination-theory-shayla-nelson/" target="_blank" class="cta-button">
          Read My Chapter
        </a>
      </p>
    `,
  },
  3: {
    title: "Instructional Design for Antibiotic Resistance Lesson",
    content: `
  <h3>Project Overview</h3>
  <p>
    Designed a complete online multimedia lesson on antibiotic resistance, integrating
    instructional design principles from learner analysis to evaluation. The module
    targets undergraduate and graduate STEM students, with a secondary audience of
    any college-level learners interested in public health.
  </p>

  <h3>Challenge</h3>
  <p>
    Antibiotic resistance poses a global health crisis, yet public understanding of
    its mechanisms and implications is often limited. The challenge was to create a
    comprehensive, engaging, and scientifically accurate learning experience that
    could be understood by learners with varying levels of microbiology knowledge.
  </p>

  <h3>Solution</h3>
  <p>
    Conducted a full instructional design process:
    <ul>
      <li>Learner, needs, and task analyses to define instructional goals.</li>
      <li>Objectives aligned to Bloom's Taxonomy.</li>
      <li>Formative and summative assessments tied directly to objectives.</li>
      <li>Multimedia integration, including interactive diagrams and narrated slides.</li>
      <li>Evaluation plan for continuous improvement.</li>
    </ul>
    Delivered a PowerPoint presenataion, supporting materials, and a 45-minute informational video on the design process.
  </p>

  <h3>Results</h3>
  <p>
    Produced a reusable, adaptable lesson package suitable for higher education and
    public health education initiatives. The design framework ensures clear learning
    pathways, measurable outcomes, and high learner engagement.
  </p>

  <h3>Technologies Used</h3>
  <p>Microsoft PowerPoint, Canva, Word</p>

<h3>Project Materials</h3>

<div class="materials-grid">
  <figure>
    <a href="images/resistance3.png" target="_blank" rel="noopener">
      <img
        src="images/resistance3.png"
        alt="Slides thumbnail: overview of learner, needs, and task analyses"
        loading="lazy" decoding="async" />
    </a>
    <figcaption>
      Deck excerpt: task analysis overview
    </figcaption>
  </figure>

  <figure>
    <a href="images/resistance2.png" target="_blank" rel="noopener">
      <img
        src="images/resistance2.png"
        alt="Slides thumbnail: six-module lesson structure aligned to Gagné’s events"
        loading="lazy" decoding="async" />
    </a>
    <figcaption>
      Deck excerpt: 9 events of instruction
    </figcaption>
  </figure>
</div>

<div class="materials-note" role="note">
  <p>
    <em>Note:</em> The presentation slides showcase the <strong>analysis and design process</strong>
    (learner, needs, and task analyses, plus lesson development), not the full instructional delivery.
  </p>
</div>

<div class="materials-buttons">
  <a class="cta-button" href="documents/Antibiotic_Resistance_LessonPlan.pdf" target="_blank" rel="noopener">Lesson Plan (PDF)</a>
  <a class="cta-button" href="documents/Antibiotic_Resistance_Slides.pdf" target="_blank" rel="noopener">View Slides (PDF)</a>
</div>

`,
  },

  4: {
    title: "One Topic, Twenty+ Ways: Learning Theories",
    content: `
      <h3>Overview</h3>
      <p>A single lesson topic, designed 20+ different ways using distinct learning theories and theorists. Each plan includes objectives, activities, and assessments tailored to its guiding theory. This collection demonstrates how different frameworks influence instructional choices and provides a rich example of theory-to-practice translation.</p>
      
      <h3>Impact</h3>
      <ul>
        <li>Demonstrates flexibility in applying diverse theories to one content area</li>
        <li>Shows clear alignment between objectives, activities, and assessment across designs</li>
        <li>Provides reusable patterns for adapting lessons to different learner needs</li>
      </ul>
      
      <h3>Technologies Used</h3>
      <p>OER, Google Docs, ChatGPT</p>

      <div class="theory-browser" role="region" aria-label="Learning theory lesson plans">
        <div class="theory-browser__intro">
          <p><strong>Browse the lesson plans</strong> by their guiding theory or theorist. Each version reimagines the same topic through a different lens. Click "View plan" to see the complete lesson design.</p>
        </div>

        <ul class="theory-list" style="list-style:none; padding:0; margin:1rem 0; display:grid; gap:1rem;">
          ${[
            {
              t: "Behaviorism",
              f: "observable behaviors, stimulus–response, reinforcement",
              id: "behaviorism",
              file: "behaviorism.txt",
            },
            {
              t: "Cognitivism",
              f: "perception, working memory, encoding, retrieval",
              id: "cognitivism",
              file: "cognitivism.txt",
            },
            {
              t: "Constructivism",
              f: "learner-centered discovery, scaffolding, reflection",
              id: "constructivism",
              file: "constructivism.txt",
            },
            {
              t: "Socioculturalism",
              f: "ZPD, guided participation, cultural tools",
              id: "socioculturalism",
              file: "socioculturalism.txt",
            },
            {
              t: "Connectivism",
              f: "networks, technology-mediated learning, currency of knowledge",
              id: "connectivism",
              file: "connectivism.txt",
            },
            {
              t: "Ivan Pavlov - Classical Conditioning",
              f: "stimulus–response pairing, associative learning",
              id: "pavlov",
              file: "pavlov.txt",
            },
            {
              t: "B.F. Skinner - Operant Conditioning",
              f: "reinforcement, punishment, behavior shaping",
              id: "skinner",
              file: "skinner.txt",
            },
            {
              t: "Information Processing Theory",
              f: "attention, rehearsal, encoding, retrieval",
              id: "information-processing",
              file: "information-processing-theory.txt",
            },
            {
              t: "Cognitive Load Theory",
              f: "reduce extraneous; scaffold intrinsic; maximize germane",
              id: "cognitive-load",
              file: "cognitive-load.txt",
            },
            {
              t: "Robert Gagné's 9 Events of Instruction",
              f: "structured sequence from attention to transfer",
              id: "gagne-nine-events",
              file: "gagne-nine-events.txt",
            },
            {
              t: "Bloom's Taxonomy",
              f: "remember → create progression; higher-order thinking",
              id: "blooms-taxonomy",
              file: "blooms-taxonomy.txt",
            },
            {
              t: "Jean Piaget (Theory of Cognitive Development)",
              f: "four developmental stages from sensorimotor to formal operational",
              id: "piaget",
              file: "piaget.txt",
            },
            {
              t: "Jerome Bruner (Constructivist Learning Theory)",
              f: "discovery learning, spiral curriculum",
              id: "bruner",
              file: "bruner.txt",
            },
            {
              t: "David A. Kolb (Experiential Learning Theory)",
              f: "four-stage cycle from concrete → reflective → abstract → active",
              id: "experiential-learning",
              file: "kolb.txt",
            },
            {
              t: "Schema Theory",
              f: "mental frameworks; prior knowledge structures; assimilation/accommodation",
              id: "schema-theory",
              file: "schema-theory.txt",
            },
            {
              t: "Vygotsky's Sociocultural Theory",
              f: "ZPD, social interaction, cultural mediation",
              id: "vygotsky",
              file: "vygotsky.txt",
            },
            {
              t: "Leontiev's Activity Theory",
              f: "activity systems; subject-object-community; mediated action",
              id: "leontiev",
              file: "leontiev.txt",
            },
            {
              t: "Gibson's Ecological Approach to Learning",
              f: "environmental affordances; direct perception; ecological learning",
              id: "gibson",
              file: "gibson.txt",
            },
            {
              t: "Bandura's Social Learning Theory",
              f: "modeling, self-efficacy, observational learning",
              id: "social-learning",
              file: "bandura.txt",
            },
            {
              t: "Collaborative Learning",
              f: "group work, shared goals, peer interaction",
              id: "collaborative-learning",
              file: "collaborative-learning.txt",
            },
            {
              t: "Social Interdependence Theory",
              f: "positive interdependence; individual accountability; cooperative learning",
              id: "social-interdependence",
              file: "social-interdependence.txt",
            },
            {
              t: "Self-Regulated Learning",
              f: "goal setting, self-monitoring, reflection",
              id: "self-regulated-learning",
              file: "self-regulated-learning.txt",
            },
            {
              t: "Self-Determination Theory",
              f: "autonomy, competence, relatedness",
              id: "self-determination",
              file: "self-determination.txt",
            },
            {
              t: "Maslow's Hierarchy of Needs",
              f: "five-level pyramid from physiological to self-actualization",
              id: "maslow",
              file: "maslow.txt",
            },
            {
              t: "Keller's ARCS Model",
              f: "attention, relevance, confidence, satisfaction",
              id: "keller-arcs",
              file: "keller-arcs.txt",
            },
            {
              t: "Flow Theory",
              f: "optimal challenge–skill balance; deep engagement",
              id: "flow-theory",
              file: "flow-theory.txt",
            },
          ]
            .map(
              (x) => `
            <li class="theory-item" style="background:#f7f9fc; border:1px solid #e6ecf2; border-radius:12px; padding:1rem; transition:.3s;">
              <h4 style="margin:0 0 .35rem; color:#1a2e49;">${x.t}</h4>
              <p style="margin:0 0 .5rem; font-size:.95rem; color:#666;">Focus: ${x.f}</p>
              <a href="#" class="theory-link" data-plan-id="${x.id}" data-file="${x.file}" style="color:#58a6d2; text-decoration:none; font-weight:500;">View plan</a>
              <div id="plan-${x.id}" class="theory-plan" style="display:none; margin-top:1rem; padding:1rem; background:#fff; border-radius:8px; border-left:4px solid #58a6d2;">
                <div class="plan-content">Loading...</div>
                <button class="close-plan" onclick="closePlan('${x.id}'); return false;" style="background:#f76c5e; color:#fff; border:none; padding:.5rem 1rem; border-radius:5px; cursor:pointer; float:right; margin-top:2rem;">Close</button>
              </div>
            </li>
          `
            )
            .join("")}
        </ul>

        <div style="font-size:.9rem; opacity:.85; text-align:center; margin-top:2rem; padding:1rem; background:#fff7e6; border-radius:8px; border:1px dashed #f4cc8a;">
          <p><strong>Collaboration note:</strong> These lesson plans were co-developed with ChatGPT through iterative prompts exploring different theoretical frameworks. Each plan was then reviewed and refined to ensure alignment with learning objectives and maintain pedagogical coherence. This collection demonstrates the power of AI-assisted instructional design while maintaining human oversight and creativity.</p>
        </div>
      </div>
    `,
  },
  5: {
    title: "LMS Course Development & Migration",
    content: `
      <h3>Project Overview</h3>
      <p>Supported the transition of university-level courses from Moodle to Canvas, ensuring high-quality content migration, clear structure, and learner-friendly navigation. Collaborated with a program manager to prepare courses for student use.</p>

      <h3>Process & Responsibilities</h3>
      <ul>
        <li>Migrated course content using Moodle backups and Canvas import tools.</li>
        <li>Repaired broken links, updated videos, and ensured all embedded resources functioned correctly.</li>
        <li>Re-created assessments and content that failed to transfer properly.</li>
        <li>Set up and tested Canvas gradebooks to align with institutional grading policies.</li>
        <li>Applied consistent module organization to support student navigation.</li>
        <li>Communicated with a program manager to clarify goals, timelines, and migration needs.</li>
      </ul>

      <h3>Impact</h3>
      <ul>
        <li>Delivered student-ready courses aligned with institutional standards.</li>
        <li>Improved course structure and usability for both learners and instructors.</li>
        <li>Minimized post-migration errors and reduced faculty troubleshooting needs.</li>
      </ul>

      <h3>Technologies Used</h3>
      <p>Canvas, Moodle, Panopto, Generative AI</p>

      <h3>Behind the Migration</h3>
      <p>In this video, I use an AI-generated avatar, a tool I've been exploring for instructional and professional communication. I reflect on my experience migrating courses from Moodle to Canvas and share insights I gained about clarity, structure, and usability in online learning environments.</p>
      
      <div class="centered-video">
        <video controls>
          <source src="documents/LMS_Migration.mp4" type="video/mp4">
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
    `,
  },
  6: {
    title: "Student Success & Program Review Dashboards",
    content: `
      <h3>Project Overview</h3>
      <p>At the College of Western Idaho, I designed and built interactive Power BI dashboards to support program review and improve student success outcomes. These reports were used by faculty, department chairs, and institutional leadership to inform decision-making and track progress toward strategic goals.</p>

      <h3>Key Features</h3>
      <ul>
        <li>Dynamic filters for term, course, program, student demographics, etc.</li>
        <li>Visual summaries of course success, equity gaps, retention rates, and enrollment trends</li>
        <li>Interactive drill-downs for department- and course-level data</li>
      </ul>

      <h3>Impact</h3>
      <ul>
        <li>Supported annual program reviews and accreditation documentation</li>
        <li>Helped CTE deans identify opportunities to improve student outcomes</li>
        <li>Encouraged data-informed conversations across departments</li>
      </ul>

      <h3>Technologies Used</h3>
      <p>Power BI, DAX, SQL, Excel, Institutional Data Warehouse</p>

      <h3>Note</h3>
      <p>Due to data privacy policies, the reports are not publicly shareable. However, a representative mockup using fabricated data is shown below.</p>

      <h3>Sample Power BI Report</h3>
      <a href="images/powerbi-dashboard-mockup.jpg" target="_blank">
        <img src="images/powerbi-dashboard-mockup.jpg" alt="Dashboard mockup" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;" />
      </a>
    `,
  },
};

/* ===========================
   Portfolio Card -> Modal Inject
=========================== */
$$(".portfolio-card").forEach((card, index) => {
  // entrance animation setup
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

  // modal open
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    const project = projectData[projectId];
    if (!modal || !modalTitle || !modalBody || !project) return;

    modalTitle.textContent = project.title;
    modalBody.innerHTML = project.content;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    // Initialize theory browser if this is project 4
    if (projectId === "4") setTimeout(initializeTheoryBrowser, 100);
  });
});

/* ===========================
   Portfolio Card Reveal on Scroll
=========================== */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, i * 100);
      }
    });
  },
  { threshold: 0.1 }
);

$$(".portfolio-card").forEach((card) => cardObserver.observe(card));

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  /* ===========================
     Contact Form Validation
  =========================== */
  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = (formData.get("name") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();

      // Reset messages
      formMessage.style.display = "none";
      formMessage.className = "form-message";

      // Validation
      const errors = [];
      if (!name) errors.push("Name is required");
      if (!email) {
        errors.push("Email is required");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email address");
      }
      if (!message) errors.push("Message is required");
      else if (message.length < 10)
        errors.push("Message must be at least 10 characters long");

      if (errors.length) {
        showFormMessage(errors.join("<br>"), "error");
        return;
      }

      // Real submission to Formspree
      const submitButton = contactForm.querySelector(".form-button");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      })
        .then(async (response) => {
          if (response.ok) {
            showFormMessage(
              "Thank you for your message! I’ll get back to you soon.",
              "success"
            );
            contactForm.reset();
          } else {
            let msg = "Oops! Something went wrong. Please try again.";
            try {
              const data = await response.json();
              if (data && data.errors) {
                msg = data.errors.map((e) => e.message).join("<br>");
              }
            } catch (_) {}
            showFormMessage(msg, "error");
          }
        })
        .catch(() => {
          showFormMessage(
            "There was a network problem submitting your form.",
            "error"
          );
        })
        .finally(() => {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
          }
        });
    });
  }

  function showFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.innerHTML = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";

    if (type === "success") {
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  }
});

/* ===========================
   Theory Browser
=========================== */

function initializeTheoryBrowser() {
  if (theoryBrowserBound) return;
  theoryBrowserBound = true;

  document.addEventListener("click", async (e) => {
    const link = e.target.closest(".theory-link");
    if (!link) return;

    e.preventDefault();
    const planId = link.getAttribute("data-plan-id");
    const fileName = link.getAttribute("data-file");
    const planElement = planId ? $(`#plan-${planId}`) : null;
    const contentDiv = planElement ? $(".plan-content", planElement) : null;

    if (!planElement || !contentDiv) return;

    // Store the theory item element itself (not just scroll position)
    const theoryItem = link.closest(".theory-item");
    if (theoryItem) {
      planScrollPositions[planId] = theoryItem;
    }

    // Close other open plans
    $$(".theory-plan").forEach((plan) => (plan.style.display = "none"));

    // Loading state
    contentDiv.innerHTML = "<p>Loading lesson plan...</p>";
    planElement.style.display = "block";

    // Load content
    const lessonContent = await loadLessonPlan(fileName);
    contentDiv.innerHTML = lessonContent;
  });
}

function closePlan(planId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Hide the plan
  const planElement = document.getElementById(`plan-${planId}`);
  if (planElement) {
    planElement.style.display = "none";

    // Scroll back to the theory item
    const theoryItem = planScrollPositions[planId];
    if (theoryItem) {
      theoryItem.scrollIntoView({ behavior: "smooth", block: "center" });
      // Clean up
      delete planScrollPositions[planId];
    }
  }

  return false;
}

/* ===========================
   Images: Load & Preload
=========================== */
$$("img").forEach((img) => {
  img.addEventListener("load", () => {
    img.style.opacity = "1";
  });
});

// Preload critical images
[
  "https://images.unsplash.com/photo-1494790108755-2616b612b742?w=400&h=400&fit=crop&crop=face",
].forEach((src) => {
  const img = new Image();
  img.src = src;
});

/* ===========================
   Page Load Kickoff
=========================== */
window.addEventListener("load", () => {
  // Trigger initial reveal
  window.dispatchEvent(new Event("scroll"));
});

/* ===========================
   Subtle Parallax (Hero)
=========================== */
if (homeSection) {
  window.addEventListener("scroll", () => {
    const rate = window.pageYOffset * -0.5;
    homeSection.style.transform = `translateY(${rate}px)`;
  });
}

/* ===========================
   Optional: Typing Animation
=========================== */
function typeWriter(element, text, speed = 100) {
  if (!element) return;
  element.textContent = "";
  element.style.borderRight = "2px solid var(--accent)";

  let i = 0;
  (function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    } else {
      setTimeout(() => (element.style.borderRight = "none"), 1000);
    }
  })();
}
// To enable: typeWriter(heroTitle, originalText, 80);

/* ===========================
   Footer: Auto Year
=========================== */
const y = document.getElementById("copyright-year");
if (y) y.textContent = new Date().getFullYear();
