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
    // Check if epubFile is already a full URL or a local file
    const isFullUrl = epubFile.startsWith("http");
    const fullPath = isFullUrl ? epubFile : `/epubs/${epubFile}`;

    console.log(`🚀 Attempting to load ePub from: ${fullPath}`);

    const epubViewer = document.getElementById("epub-viewer");
    const mainHeading = document.getElementById("main-heading");

    if (!epubViewer) {
        console.error("❌ Error: epubViewer element not found!");
        return;
    }

    epubViewer.style.display = "block";
    mainHeading.style.display = "none";

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
