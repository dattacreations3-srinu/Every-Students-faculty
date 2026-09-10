/* =========================================
   EVERY STUDENT - FACULTY JAVASCRIPT
========================================= */


/* ---------- SIDEBAR NAVIGATION ---------- */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const pageName = item.dataset.page;

        switchPage(pageName);

    });

});


function switchPage(pageName){

    pages.forEach(page => {

        page.classList.remove("active-page");

    });

    navItems.forEach(item => {

        item.classList.remove("active");

    });


    const targetPage = document.getElementById(pageName);

    const targetNav = document.querySelector(
        `.nav-item[data-page="${pageName}"]`
    );


    if(targetPage){

        targetPage.classList.add("active-page");

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    }


    if(targetNav){

        targetNav.classList.add("active");

    }


    updateBreadcrumb(pageName);

    closeSidebar();

}


function updateBreadcrumb(pageName){

    const breadcrumb = document.querySelector(".breadcrumb");

    if(!breadcrumb) return;

    const names = {
        dashboard:"Dashboard",
        students:"Students",
        activities:"Activities",
        points:"Award Points",
        feedback:"Feedback",
        identities:"Identities",
        discover:"Discover Students",
        notifications:"Notifications",
        settings:"Settings"
    };

    breadcrumb.innerHTML = `
        <span>Faculty</span>
        <strong>/ ${names[pageName] || "Dashboard"}</strong>
    `;
}


/* ---------- MOBILE SIDEBAR ---------- */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("mobileOverlay");

if(menuBtn){

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");
        overlay.classList.toggle("show");

    });

}


if(overlay){

    overlay.addEventListener("click", closeSidebar);

}


function closeSidebar(){

    sidebar.classList.remove("open");
    overlay.classList.remove("show");

}


/* ---------- MODALS ---------- */

function openModal(id){

    const modal = document.getElementById(id);

    if(modal){

        modal.classList.add("show");

    }

}


function closeModal(id){

    const modal = document.getElementById(id);

    if(modal){

        modal.classList.remove("show");

    }

}


document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if(event.target === modal){

            modal.classList.remove("show");

        }

    });

});


document.addEventListener("keydown", event => {

    if(event.key === "Escape"){

        document.querySelectorAll(".modal.show")
            .forEach(modal => modal.classList.remove("show"));

    }

});


/* ---------- AWARD POINTS ---------- */

function awardPoints(){

    const student =
        document.getElementById("awardStudent").value;

    const amount =
        document.getElementById("awardAmount").value;


    if(!amount || Number(amount) <= 0){

        showToast("Please enter a valid point amount.");

        return;

    }


    closeModal("pointsModal");

    showToast(
        `${amount} points awarded to ${student}.`
    );


    document.getElementById("awardAmount").value = "";

}


/* ---------- CREATE ACTIVITY ---------- */

function createActivity(){

    const activityName =
        document.getElementById("activityName").value;


    if(!activityName.trim()){

        showToast("Please enter an activity name.");

        return;

    }


    closeModal("activityModal");

    showToast(
        `"${activityName}" created successfully.`
    );


    document.getElementById("activityName").value = "";

}


/* ---------- FEEDBACK ---------- */

function saveFeedback(){

    closeModal("feedbackModal");

    showToast(
        "Faculty feedback saved successfully."
    );

}


/* ---------- STUDENT DETAILS ---------- */

function openStudent(name){

    document.getElementById(
        "detailStudentName"
    ).textContent = name;

    openModal("studentModal");

}


/* ---------- TOAST ---------- */

let toastTimer;

function showToast(message){

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}


/* ---------- NOTIFICATIONS ---------- */

function showNotifications(){

    switchPage("notifications");

}


/* ---------- GLOBAL SEARCH ---------- */

const globalSearch =
    document.getElementById("globalSearch");


if(globalSearch){

    globalSearch.addEventListener("keydown", event => {

        if(event.key === "Enter"){

            const value =
                globalSearch.value.trim();

            if(!value) return;

            switchPage("students");

            const studentSearch =
                document.getElementById("studentSearch");

            if(studentSearch){

                studentSearch.value = value;

                filterStudents(value);

            }

        }

    });

}


/* ---------- CTRL + K SEARCH ---------- */

document.addEventListener("keydown", event => {

    if(
        (event.ctrlKey || event.metaKey)
        &&
        event.key.toLowerCase() === "k"
    ){

        event.preventDefault();

        if(globalSearch){

            globalSearch.focus();

        }

    }

});


/* ---------- STUDENT SEARCH ---------- */

const studentSearch =
    document.getElementById("studentSearch");


if(studentSearch){

    studentSearch.addEventListener("input", () => {

        filterStudents(studentSearch.value);

    });

}


function filterStudents(search){

    const rows =
        document.querySelectorAll("#studentTable tr");

    const term =
        search.toLowerCase().trim();


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        row.style.display =
            text.includes(term)
            ? ""
            : "none";

    });

}


/* ---------- INTEREST FILTER ---------- */

const interestFilter =
    document.getElementById("interestFilter");


if(interestFilter){

    interestFilter.addEventListener("change", () => {

        const value =
            interestFilter.value.toLowerCase();

        const rows =
            document.querySelectorAll("#studentTable tr");


        rows.forEach(row => {

            if(value === "all"){

                row.style.display = "";

                return;

            }


            const text =
                row.textContent.toLowerCase();


            row.style.display =
                text.includes(value)
                ? ""
                : "none";

        });

    });

}


/* ---------- CHART INTERACTION ---------- */

document.querySelectorAll(".bar").forEach(bar => {

    bar.addEventListener("mouseenter", () => {

        bar.style.transform = "translateY(-5px)";

    });


    bar.addEventListener("mouseleave", () => {

        bar.style.transform = "translateY(0)";

    });

});


/* ---------- INITIALIZE ---------- */

console.log(
    "EVERY STUDENT Faculty Portal initialized successfully."
);