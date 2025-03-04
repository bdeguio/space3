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

    if (book) {
        console.log("Destroying previous book instance...");
        book.destroy();
    }

    try {
        book = ePub(epubFile);
        console.log("Book object created successfully.");

        rendition = book.renderTo("epub-viewer", { width: "100%", height: "100vh" });

        rendition.display().then(() => {
            console.log("ePub should now be displayed.");
        }).catch(err => console.error("Error displaying ePub:", err));

        book.ready.then(() => {
            console.log("Book is ready.");
        }).catch(err => console.error("Error loading ePub file:", err));

        book.loaded.metadata.then(meta => {
            console.log("Book Metadata Loaded:", meta);
        }).catch(err => console.error("Metadata loading error:", err));

        book.opened.then(() => {
            console.log("Forcing book to display first chapter...");
            rendition.display(book.spine.first());
        });


    } catch (error) {
        console.error("Failed to load ePub:", error);
    }
}
