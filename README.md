# GitTree

GitTree is a simple tool to generate and visualize the file structure of any public GitHub repository as a tree. You can copy the tree as Markdown or download it as a ZIP file.

## How to Use

1. **Enter GitHub Repository URL**:
   - Go to the website and enter the GitHub repository URL (e.g., `https://github.com/sachinz25/GitTree`).
   - Optionally, specify the branch (default is `main`).

2. **Generate Tree**:
   - Click the "Generate Tree" button to fetch and display the repository's file structure.

3. **Copy as Markdown**:
   - Click the "Copy Tree as Markdown" button to copy the tree structure to your clipboard.

4. **Download as ZIP**:
   - Click the "Download Tree as ZIP" button to download the tree structure as a ZIP file.

## Run Locally

To run this project on your computer:

   ```bash
1. **Clone the Repository**:
   git clone https://github.com/sachinz25/GitTree.git
   cd GitTree

2. **Install Dependencies:
    bash
    Copy

    npm install

3. **Start the Development Server:
    bash
    Copy

    npm run dev

    Open in Browser:

        Visit http://localhost:3000 in your browser.

Technologies Used

    Next.js: A React framework for building web applications.

    GitHub API: Fetches repository data.

    CSS Modules: For styling the components.

    JSZip: Creates ZIP files for download.

    FileSaver.js: Saves the generated ZIP file.


Built with ❤️ by sachin.

