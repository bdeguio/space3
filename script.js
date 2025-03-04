let book;
let rendition;

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const epubList = document.getElementById("epub-list");

    if (sidebar.classList.contains("expanded")) {
        sidebar.classList.remove("expanded");
        epubList.style.display = "none";
    } else {
        sidebar.classList.add("expanded");
        epubList.style.display = "block";
    }
}

function loadEpub(epubFile) {
    console.log(`Attempting to load ePub: ${epubFile}`);

    const epubViewer = document.getElementById("epub-viewer");
    const mainHeading = document.getElementById("main-heading");
    const closeBtn = document.getElementById("close-btn");

    epubViewer.style.display = "block";
    mainHeading.style.display = "none"; // Hide heading when an ePub is opened
    closeBtn.style.display = "block"; // Show Close button

    // Clear existing book if already loaded
    if (book) {
        console.log("Destroying previous book instance...");
        book.destroy();
    }

    try {
        // Load new ePub book
        book = ePub(epubFile);
        console.log("Book object created successfully.");

        rendition = book.renderTo("epub-viewer", { width: "100%", height: "100vh" });
        console.log("Rendition object created successfully.");

        rendition.display().then(() => {
            console.log("ePub should now be displayed.");
            
            // Register and apply dark mode theme
            rendition.themes.register("dark", {
                "body": { "background": "black", "color": "white" },
                "p": { "color": "white" },
                "h1, h2, h3, h4, h5, h6": { "color": "white" }
            });
            rendition.themes.sele
