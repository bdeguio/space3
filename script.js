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
    const epubViewer = document.getElementById("epub-viewer");
    const mainHeading = document.getElementById("main-heading");
    const closeBtn = document.getElementById("close-btn");

    epubViewer.style.display = "block";
    mainHeading.style.display = "none"; // Hide heading when an ePub is opened
    closeBtn.style.display = "block"; // Show Close button

    // Clear existing book if already loaded
    if (book) {
        book.destroy();
    }

    // Load new ePub book
    book = ePub(epubFile);
    rendition = book.renderTo("epub-viewer", { width: "100%", height: "100vh" });

    // Apply dark mode to ePub content
    rendition.display().then(() => {
        rendition.themes.register("dark", {
            "body": { "background": "black", "color": "white" },
            "p": { "color": "white" },
            "h1, h2, h3, h4, h5, h6": { "color": "white" }
        });
        rendition.themes.select("dark");
    });
}

function closeEpubViewer() {
    const epubViewer = document.getElementById("epub-viewer");
    const mainHeading = document.getElementById("main-heading");
    const closeBtn = document.getElementById("close-btn");

    epubViewer.style.display = "none";
    closeBtn.style.display = "none"; // Hide Close button
    mainHeading.style.display = "block"; // Show heading again when closing ePub

    if (book) {
        book.destroy(); // Properly remove the ePub instance
    }
}
