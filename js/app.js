/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const sections = document.querySelectorAll("section");
const navBar = document.querySelector('#navbar__list');
const fragment = document.createDocumentFragment();
const up =document.querySelector('.up-top');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
const buildNav = () =>{
  //get number of sections in html page and create (a inside li) with the name of section's data-nav
sections.forEach((section)=>{
  let secDataNav = section.getAttribute("data-nav");
  let secId = section.getAttribute("id");
  let navList = document.createElement("li");
  let navLink = document.createElement("a");
  let textNode = document.createTextNode(secDataNav);
  navLink.setAttribute("data-nav",secId);
  navLink.classList.add("menu__link");
  navLink.appendChild(textNode);
  navList.appendChild(navLink);
  fragment.appendChild(navList);
  // when click on the created anchor it scrolls to it's section using scrollIntoView
  navLink.addEventListener('click',()=>{
    //behavior : smooth to scroll to the section slowly
    section.scrollIntoView({behavior: "smooth"});
  });
});
navBar.appendChild(fragment);
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/
// build the nav
document.addEventListener('DOMContentLoaded',buildNav());

// Add class 'active' to section when near top of viewport
if(!!window.IntersectionObserver)
{
  let sectionLinks = document.querySelectorAll(".menu__link");
  let observer = new IntersectionObserver((sections, observer) =>{
    //for each section of sections in page
    sections.forEach(section => {
      let targetId = section.target = section.target.getAttribute('id');
      //if section is intersecting with viewport with 70% add class active
      if(section.isIntersecting){
        //for each link of links, if it's data-nav attr equals section-id attr, then when section is active link is active
        sectionLinks.forEach(sectionLink =>{
          if(sectionLink.getAttribute("data-nav") === targetId){
            //add class active to link when it's section is in viewport
            sectionLink.classList.add("link-active");
          } else {
            //remove class active from link when it's section is out viewport
            sectionLink.classList.remove("link-active");
          }
        });
        section.target = section.target.classList.add('your-active-class');
        //else remove this class
      } else{
        section.target = section.target.classList.remove('your-active-class');
      }
    });
    //when section appers from 70%
  },{threshold: 0.7});
  //select all sections to apply this Intersection observer
   sections.forEach(section => {
     observer.observe(section)
   });
}

// scroll to top button appear when scrolling down
document.addEventListener('scroll', () =>{
  // if elements in body when scroll down is greater than 1700px make up botton appers if not dispaper again
  if(document.documentElement.scrollTop > 1700){
    up.style.display = "block";
  } else {
    up.style.display = "none";
  }
});
//click on button scroll to top
up.addEventListener('click',()=>{
  document.documentElement.scrollIntoView({behavior: "smooth"});
});

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
