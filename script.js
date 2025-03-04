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
    const fullPath = `/ePubs/${epubFile}`;  // Updated path
    console.log(`🚀 Attempting to load ePub: ${fullPath}`);

    const epubViewer = document.getElementById("epub-viewer");
    const mainHeading = document.getElementById("main-heading");
    const closeBtn = document.getElementById("close-btn");

    epubViewer.style.display = "block";
    mainHeading.style.display = "none";
    closeBtn.style.display = "block";

    if (book) {
        console.log("Destroying previous book instance...");
        book.destroy();
    }

    try {
        book = ePub(fullPath);
        console.log("✅ Book object created:", book);

        rendition = book.renderTo("epub-viewer", { width: "100%", height: "100vh" });

        rendition.display().then(() => {
            console.log("✅ ePub should now be displayed.");
        }).catch(err => console.error("❌ Error displaying ePub:", err));

        book.ready.then(() => {
            console.log("✅ Book is ready.");
        }).catch(err => console.error("❌ Error loading ePub file:", err));

        book.loaded.metadata.then(meta => {
            console.log("✅ Book Metadata Loaded:", meta);
        }).catch(err => console.error("❌ Metadata loading error:", err));

        book.opened.then(() => {
            console.log("✅ Forcing book to display first chapter...");
            rendition.display(book.spine.first());
        }).catch(err => console.error("❌ Error displaying first chapter:", err));

    } catch (error) {
        console.error("❌ Failed to load ePub:", error);
    }
}


function closeEpubViewer() {
    console.log("Closing ePub viewer...");
    const epubViewer = document.getElementById("epub-viewer");
    const mainHeading = document.getElementById("main-heading");
    const closeBtn = document.getElementById("close-btn");

    epubViewer.style.display = "none";
    closeBtn.style.display = "none"; // Hide Close button
    mainHeading.style.display = "block"; // Show heading again when closing ePub

    if (book) {
        console.log("Destroying ePub instance...");
        book.destroy(); // Properly remove the ePub instance
    }
}
