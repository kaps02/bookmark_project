const apiUrl = 'https://crudcrud.com/api/a497d0aab9f24824b6382e7f2d7489a7/bookmarks';

// Function to add a bookmark
async function addBookmark() {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    if (title && url) {
        try {
            await axios.post(apiUrl, { title, url });
            fetchBookmarks();
            document.getElementById('title').value = '';
            document.getElementById('url').value = '';
        } catch (error) {
            console.error('Error adding bookmark', error);
        }
    } else {
        alert('Please enter both title and URL');
    }
}

// Function to fetch bookmarks and update the UI
async function fetchBookmarks() {
    try {
        const response = await axios.get(apiUrl);
        const bookmarks = response.data;

        const bookmarkContainer = document.getElementById('bookmarkContainer');
        bookmarkContainer.innerHTML = '';

        bookmarks.forEach(bookmark => {
            const bookmarkElement = createBookmarkElement(bookmark);
            bookmarkContainer.appendChild(bookmarkElement);
        });
    } catch (error) {
        console.error('Error fetching bookmarks', error);
    }
}

// Function to create a bookmark element with delete and edit functionality
function createBookmarkElement(bookmark) {
    const bookmarkElement = document.createElement('div');
    bookmarkElement.classList.add('bookmark');

    const titleElement = document.createElement('span');
    titleElement.textContent = bookmark.title;

    const urlElement = document.createElement('a');
    urlElement.href = bookmark.url;
    urlElement.textContent = bookmark.url;
    urlElement.target = '_blank';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    deleteButton.onclick = async () => {
        try {
            await axios.delete(`${apiUrl}/${bookmark._id}`);
            fetchBookmarks();
        } catch (error) {
            console.error('Error deleting bookmark', error);
        }
    };

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    editButton.onclick = async () => {
        const updatedTitle = prompt('Enter updated title:', bookmark.title);
        const updatedUrl = prompt('Enter updated URL:', bookmark.url);

        if (updatedTitle !== null && updatedUrl !== null) {
            try {
                await axios.put(`${apiUrl}/${bookmark._id}`, { title: updatedTitle, url: updatedUrl });
                fetchBookmarks();
            } catch (error) {
                console.error('Error updating bookmark', error);
            }
        }
    };

    bookmarkElement.appendChild(titleElement);
    bookmarkElement.appendChild(urlElement);
    bookmarkElement.appendChild(deleteButton);
    bookmarkElement.appendChild(editButton);

    return bookmarkElement;
}

// Initial fetch of bookmarks when the page loads
fetchBookmarks();
