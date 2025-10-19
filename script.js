/* script.js

   - GSAP + ScrollTrigger initialization
   - custom cursor
   - sidebar open/close
   - preloader
   - page animations 
   - tab injection logic
   - "Click For More" hover & click
   - back-to-top
*/

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
  // ELEMENT REFS
  const cursor = document.querySelector('.cursor');
  const maincontain = document.querySelector('.maincontain') || document.body;
  const sidebutton = document.querySelector('.sidebutton');
  const sidebar1 = document.querySelector('.sidebar1');
  const cross = document.querySelector('.cross');
  const preloader = document.getElementById('preloaderRoot');
  const backTop = document.querySelector('.backtop');
  const moreBtn = document.querySelector('.more');
  const cborder = document.getElementById('cborder');

  // ----- Custom cursor movement -----
  function moveHandler(e) {
    const x = e.clientX;
    const y = e.clientY;
    gsap.to(".cursor", {
      x: x,
      y: y,
      duration: 0.8,
      ease: "power2"
    });
  }
  document.addEventListener('mousemove', moveHandler);

  // ----- Sidebar open/close using GSAP -----
  // Ensure sidebar initial transform to right (100%)
  if (sidebar1) {
    // set initial transform so GSAP animates relative to it
    gsap.set(sidebar1, { xPercent: 100 });
  }

  if (sidebutton && sidebar1) {
    sidebutton.addEventListener('click', () => {
      // show and slide-in
      gsap.to(sidebar1, { xPercent: 0, duration: 0.35, ease: "power2.out" });
    });
  }

  if (cross && sidebar1) {
    cross.addEventListener('click', () => {
      gsap.to(sidebar1, { xPercent: 100, duration: 0.35, ease: "power2.in" });
    });
  }

  // Also allow clicking an element inside sidebar to close if desired (optional)
  // e.g. clicking any link inside sidebar will close it
  const sidebarLinks = sidebar1 ? sidebar1.querySelectorAll('a') : [];
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => gsap.to(sidebar1, { xPercent: 100, duration: 0.35 }));
  });

  // ----- Preloader animation (mimic original) -----
  (function preloaderAnim() {
    const boxes = document.querySelectorAll('.loadbox');
    const t1 = gsap.timeline();
    t1.to(boxes, { height: 0, duration: 1, stagger: 0.2, delay: 1 });
    t1.to(".loadboxes", { display: "none" }, "+=0.1");
    t1.to(".mainloadbox", { display: "none" }, "+=0.1");
  })();

  // ----- Navbar small animations -----
  (function navbarGsap() {
    // reveal navbar after short delay, reveal nav items
    gsap.from(".navbar", { height: 0, opacity: 0, delay: 2.6, duration: 0.5 });
    const navItems = document.querySelectorAll('.navbar ul li');
    if (navItems.length) {
      gsap.fromTo(navItems, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, delay: 3, stagger: 0.1 });
    }
    // change navbar bg color on scroll slightly
    if (document.querySelector('.homepage')) {
      gsap.to(".navbar", {
        backgroundColor: "rgb(0,0,0,1)",
        duration: 1,
        scrollTrigger: {
          trigger: ".homepage",
          scroller: "body",
          scrub: true,
          start: "top 20%",
        }
      });
    }
  })();

  // ----- Page2 animations & scrollers -----
  (function page2Gsap() {
    gsap.fromTo(".starimage", { opacity: 0 }, { opacity: 1, duration: 2, delay: 0.5, scrollTrigger: { trigger: ".animationbox1", start: "top 70%", toggleActions: "restart none none none" } });
    gsap.fromTo(".maintext1", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: ".animationbox1", start: "top 80%", toggleActions: "restart none none none" } });
    gsap.fromTo(".personalimg", { scale: 0.5 }, { scale: 1, duration: 0.6, scrollTrigger: { trigger: ".details", start: "top 90%", end: "top -10%", scrub: true } });
    gsap.fromTo(".skillsets", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1, scrollTrigger: { trigger: ".details2", start: "top 0%", end: "top -10%", toggleActions: "restart" } });

    // continuous scrollers
    const t1 = gsap.timeline();
    t1.fromTo("#scroll1", { x: "0%" }, { x: "-121.5%", duration: 5, ease: "none", repeat: -1 });
    const t2 = gsap.timeline();
    t2.fromTo("#scroll2", { x: "0%" }, { x: "-121.5%", duration: 5, ease: "none", repeat: -1 });

    // pause on hover (if present)
    const scroller = document.querySelector('#scroll1');
    if (scroller) {
      scroller.addEventListener('mouseenter', () => t1.pause());
      scroller.addEventListener('mouseleave', () => t1.play());
    }
    const scroller2 = document.querySelector('#scroll2');
    if (scroller2) {
      scroller2.addEventListener('mouseenter', () => t2.pause());
      scroller2.addEventListener('mouseleave', () => t2.play());
    }
  })();

  // ----- Page3 + Page4 shared behaviors (cursor & hover) -----
  (function page3And4Gsap() {
    const cursor2 = document.querySelector('.cursor2') || document.querySelector('.cursor');
    const mainbody2 = document.querySelector('.mainbody2') || document.body;
    const circul_border = document.getElementById('cborder');
    const circle = document.querySelector('.more');

    if (circle && circul_border) {
      circle.addEventListener('mouseover', () => gsap.to(circul_border, { y: -10, x: -10, duration: 0.5 }));
      circle.addEventListener('mouseout', () => gsap.to(circul_border, { y: 0, x: 0, duration: 0.5 }));
    }

    const hoverTargets = document.querySelectorAll('.conver, .more');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        gsap.to(cursor2, { scale: 2, boxShadow: '0 0 20px #c9f31d', backgroundColor: '#c9f31d', borderColor: '#c9f31d', duration: 0.3 });
      });
      target.addEventListener('mouseleave', () => {
        gsap.to(cursor2, { scale: 1, boxShadow: 'none', backgroundColor: 'transparent', borderColor: 'white', duration: 0.3 });
      });
    });

    if (mainbody2) {
      mainbody2.addEventListener('mousemove', (e) => {
        const bounds = mainbody2.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        gsap.to(cursor2, { x: x, y: y, duration: 0.8 });
      });
    }

    // simple project entrance animations (if elements exist)
    const t1 = gsap.timeline({ scrollTrigger: { trigger: ".mainImages", start: "top 80%", end: "top -50%", scrub: 1.2 } });
    t1.fromTo(".image1", { x: "-100%" }, { x: "0%", stagger: 0.2, duration: 0.6 });
    gsap.fromTo(".image2", { x: "100%" }, { x: "0%", stagger: 0.2, duration: 0.6, scrollTrigger: { trigger: ".rightimages", start: "top 50%", end: "top -50%", scrub: 1.2 } });
  })();

  // ----- Page5 workprocess reveal & hover -----
  (function page5Gsap() {
    const mainbox = document.querySelectorAll('.dreambox');
    mainbox.forEach((box) => {
      const blackbox = box.querySelector('.blackbox');
      if (!blackbox) return;
      box.addEventListener('mouseenter', () => gsap.to(blackbox, { backgroundColor: "#c9f31d" }));
      box.addEventListener('mouseleave', () => gsap.to(blackbox, { backgroundColor: "#090909" }));
    });

    gsap.fromTo(".dreambox", { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "none", scrollTrigger: { trigger: ".workprocess", start: "top 30%", end: "top -10%", scrub: true } });
    gsap.fromTo(".dreamtext", { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "none", scrollTrigger: { trigger: ".workprocess", start: "top 30%", end: "top -10%", scrub: true } });
  })();

  // ----- Back to top -----
  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ----- LetsTalk btn placeholder (keeps original behavior) -----
  const letsTalkBtn = document.getElementById('letsTalkBtn');
  if (letsTalkBtn) letsTalkBtn.addEventListener('click', () => console.log("Let's Talk clicked"));

  // ----- Click For More - hover already handled; add click to scroll to #service ----- 
  if (moreBtn && document.querySelector('#service')) {
    // hover handled earlier by gsap; ensure click scrolls to services section
    moreBtn.addEventListener('click', () => {
      document.querySelector('#service').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----- Tab logic (About section) -----
  const contentArea = document.querySelector('.content-area');
  const tabButtons = document.querySelectorAll('.tabbtn');

  const tabContents = {
    1: `
      <div class="w-full pl-10 flex flex-col gap-4">
        <h1 class="text-4xl personaltitle">Personal Info</h1>
        <p class="text-[18px] personaltitle">I'm David Matias, I'm a Brand & Webflow Designer, Currently residing in the lush Victoria Street London, Matias operates globally and is ready to take on any design challenge.</p>
        <div class="detialTabs flex flex-wrap items-center justify-between gap-6">
          <div class="w-[48%] rounded-[8px] flex flex-col justify-between h-30 p-4 bg-[#1f1f1f] boxscale1">
            <p class="text-[20px] text-[#767676]">Email</p>
            <p class="text-[20px]">Matias999@Gmail.Com</p>
          </div>
          <div class="w-[48%] rounded-[8px] flex flex-col justify-between h-30 p-4 bg-[#1f1f1f] boxscale1">
            <p class="text-[20px] text-[#767676]">Phone</p>
            <p class="text-[20px]">+(2) 871 382 023</p>
          </div>
          <div class="w-[48%] rounded-[8px] flex flex-col justify-between h-30 p-4 bg-[#1f1f1f] boxscale2">
            <p class="text-[20px] text-[#767676]">Address</p>
            <p class="text-[20px]">Victoria Street London,</p>
          </div>
          <div class="w-[48%] rounded-[8px] flex flex-col justify-between h-30 p-4 bg-[#1f1f1f] boxscale2">
            <p class="text-[20px] text-[#767676]">Follow</p>
            <ul class="flex gap-5">
              <li><i class="fa-brands fa-facebook"></i></li>
              <li><i class="fa-brands fa-linkedin"></i></li>
              <li><i class="fa-brands fa-instagram"></i></li>
              <li><i class="fa-brands fa-x-twitter"></i></li>
              <li><i class="fa-brands fa-whatsapp"></i></li>
            </ul>
          </div>
        </div>
      </div>
    `,
    2: `
      <div class="w-full pl-10 flex flex-col gap-4">
        <h1 class="text-4xl personaltitle">My Experience</h1>
        <p class="text-[18px] personaltitle">Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur, aliquam quaerats voluptatem.</p>
        <div class="detialTabs flex flex-wrap items-center w-full justify-between gap-6 p-5 border-t">
          <p class="text-[18px] text-[#c9f31d]">In 2011</p>
          <div class="flex flex-col items-end gap-2"><h1 class="text-2xl">Software Engineer</h1><p class="text-[#848484]">UI Head & Manager</p></div>
        </div>
        <div class="detialTabs flex flex-wrap items-center w-full justify-between gap-6 p-5 border-t">
          <p class="text-[18px] text-[#c9f31d]">In 2016</p>
          <div class="flex flex-col items-end gap-2"><h1 class="text-2xl">Product Designer</h1><p class="text-[#848484]">Head of Department</p></div>
        </div>
        <div class="detialTabs flex flex-wrap items-center w-full justify-between gap-6 p-5 border-t">
          <p class="text-[18px] text-[#c9f31d]">In 2023</p>
          <div class="flex flex-col items-end gap-2"><h1 class="text-2xl">Senior UI Designer</h1><p class="text-[#848484]">Fiverr.com</p></div>
        </div>
      </div>
    `,
    3: `
      <div class="w-full pl-10 flex flex-col gap-4">
        <h1 class="text-4xl personaltitle">My Education</h1>
        <p class="text-[18px] personaltitle">Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur.</p>
        <div class="detialTabs flex flex-wrap items-start w-full justify-between gap-6 p-5 border-t">
          <p class="text-[18px] text-[#c9f31d]">2011-2013</p>
          <div class="flex flex-col items-end gap-2"><h1 class="text-[20px]">Programming Courseg</h1><p class="text-[#848484]">New York University</p></div>
        </div>
        <div class="detialTabs flex flex-wrap items-start w-full justify-between gap-6 p-5 border-t">
          <p class="text-[18px] text-[#c9f31d]">2013-2016</p>
          <div class="flex flex-col items-end gap-2"><h1 class="text-2xl">University of Design</h1><p class="text-[#848484]">Kingston, United States</p></div>
        </div>
        <div class="detialTabs flex flex-wrap items-start w-full justify-between gap-6 p-5 border-t">
          <p class="text-[18px] text-[#c9f31d]">2016-2018</p>
          <div class="flex flex-col items-end gap-2"><h1 class="text-2xl">Web Design Course</h1><p class="text-[#848484]">New York University</p></div>
        </div>
      </div>
    `,
    4: `
      <div class="w-full pl-10 flex flex-col gap-4">
        <h1 class="text-4xl personaltitle">My Skills</h1>
        <p class="text-[18px] personaltitle">Neque porro quisquam est, qui dolorem ipsum quia dolor sit consectetur.</p>
        <div class="w-full h-80 flex flex-wrap scrollbar">
          <div class="detialTabs flex flex-wrap items-center justify-between gap-6 p-5 border w-[45%] rounded-lg m-2">
            <img src="/src/assets1/c847802a-c546-4096-9c68-587f7e0c0ee3.png" class="w-[40%]" alt="" />
            <div class="flex flex-col items-end gap-2"><h1 class="text-[#848484]">Figma</h1><p class="text-[60px]">90%</p></div>
          </div>
          <div class="detialTabs flex flex-wrap items-center justify-between gap-6 p-5 border w-[45%] rounded-lg m-2">
            <img src="/src/assets1/word-f6c599de.png" class="w-[40%]" alt="" />
            <div class="flex flex-col items-end gap-2"><h1 class="text-[#848484]">Wordpress</h1><p class="text-[60px]">95%</p></div>
          </div>
          <div class="detialTabs flex flex-wrap items-center justify-between gap-6 p-5 border w-[45%] rounded-lg m-2">
            <img src="/src/assets1/html-7ff88025.png" class="w-[40%]" alt="" />
            <div class="flex flex-col items-end gap-2"><h1 class="text-[#848484]">HTML</h1><p class="text-[60px]">85%</p></div>
          </div>
          <div class="detialTabs flex flex-wrap items-center justify-between gap-6 p-5 border w-[45%] rounded-lg m-2">
            <img src="/src/assets1/boot-f1f5c693.png" class="w-[40%]" alt="" />
            <div class="flex flex-col items-end gap-2"><h1 class="text-[#848484]">Bootstrap</h1><p class="text-[60px]">97%</p></div>
          </div>
        </div>
      </div>
    `
  };

  function setActiveTab(tabNum) {
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === String(tabNum)) {
        btn.style.backgroundColor = '#c9f31d';
        btn.style.color = 'black';
        btn.style.fontWeight = 'normal';
      } else {
        btn.style.backgroundColor = '#2d2d2d';
        btn.style.color = '';
        btn.style.fontWeight = '';
      }
    });

    if (contentArea && tabContents[tabNum]) {
      contentArea.innerHTML = tabContents[tabNum];
      // small reveal animations
      gsap.fromTo('.personaltitle', { y: 100, opacity: 0 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 });
      gsap.fromTo('.boxscale1', { scale: 0.3, opacity: 0 }, { opacity: 1, scale: 1, duration: 0.1, stagger: 0.1 });
      gsap.fromTo('.boxscale2', { scale: 0.3, opacity: 0 }, { opacity: 1, scale: 1, duration: 0.1, stagger: 0.3 });
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.tab || '1';
      setActiveTab(Number(t));
    });
  });
  // default
  setActiveTab(1);

  // optional: pause scroller animations on pointerover for accessibility
  const scrollers = document.querySelectorAll('.scroller1, .scroller2');
  scrollers.forEach(s => {
    s.addEventListener('pointerenter', () => {
      // no-op; scrollers managed earlier, but good to show it's handled
    });
  });
});
