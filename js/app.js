// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const adminPanel = document.getElementById('adminPanel');
const noticeForm = document.getElementById('noticeForm');
const noticesContainer = document.getElementById('noticesContainer');
const authSection = document.getElementById('authSection');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');
const filterBtns = document.querySelectorAll('.filter-btn');
const toast = document.getElementById('toast');

let currentFilter = 'all';
let isAdmin = false;

// Show Toast Notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Format Date
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Create Notice Card HTML
function createNoticeCard(notice, id) {
    const card = document.createElement('div');
    card.className = 'notice-card';
    card.dataset.category = notice.category;
    
    card.innerHTML = `
        <div class="notice-header">
            <span class="notice-category category-${notice.category}">${notice.category}</span>
            <span class="notice-date">${formatDate(notice.timestamp)}</span>
        </div>
        <h3 class="notice-title">${escapeHtml(notice.title)}</h3>
        <p class="notice-content">${escapeHtml(notice.content)}</p>
        ${isAdmin ? `
            <div class="notice-footer">
                <button class="btn btn-delete" onclick="deleteNotice('${id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        ` : ''}
    `;
    
    return card;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load Notices from Firebase
function loadNotices() {
    const noticesRef = database.ref('notices');
    
    noticesRef.orderByChild('timestamp').on('value', (snapshot) => {
        loading.style.display = 'none';
        noticesContainer.innerHTML = '';
        
        const notices = [];
        snapshot.forEach((childSnapshot) => {
            notices.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Reverse to show newest first
        notices.reverse();
        
        if (notices.length === 0) {
            noticesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard"></i>
                    <p>No notices posted yet.</p>
                </div>
            `;
            return;
        }
        
        notices.forEach((notice) => {
            if (currentFilter === 'all' || notice.category === currentFilter) {
                const card = createNoticeCard(notice, notice.id);
                noticesContainer.appendChild(card);
            }
        });
        
        // Check if filtered results are empty
        if (noticesContainer.children.length === 0) {
            noticesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-filter"></i>
                    <p>No notices in this category.</p>
                </div>
            `;
        }
    });
}

// Post New Notice
function postNotice(title, category, content) {
    const noticesRef = database.ref('notices');
    const newNotice = {
        title: title,
        category: category,
        content: content,
        timestamp: Date.now()
    };
    
    noticesRef.push(newNotice)
        .then(() => {
            showToast('Notice posted successfully!', 'success');
            noticeForm.reset();
        })
        .catch((error) => {
            showToast('Error posting notice: ' + error.message, 'error');
        });
}

// Delete Notice
function deleteNotice(id) {
    if (confirm('Are you sure you want to delete this notice?')) {
        database.ref('notices/' + id).remove()
            .then(() => {
                showToast('Notice deleted successfully!', 'success');
            })
            .catch((error) => {
                showToast('Error deleting notice: ' + error.message, 'error');
            });
    }
}

// Update Auth UI
function updateAuthUI(user) {
    if (user) {
        isAdmin = true;
        authSection.innerHTML = `
            <div class="auth-buttons">
                <span style="color: #667eea; margin-right: 15px;">
                    <i class="fas fa-user-shield"></i> Admin
                </span>
                <button class="btn btn-logout" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        `;
        adminPanel.style.display = 'block';
        
        document.getElementById('logoutBtn').addEventListener('click', () => {
            auth.signOut();
        });
    } else {
        isAdmin = false;
        authSection.innerHTML = `
            <button class="btn btn-login" id="loginBtn">
                <i class="fas fa-sign-in-alt"></i> Admin Login
            </button>
        `;
        adminPanel.style.display = 'none';
        
        document.getElementById('loginBtn').addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }
    
    // Reload notices to update delete buttons
    loadNotices();
}

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
    errorMessage.textContent = '';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        errorMessage.textContent = '';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            loginModal.style.display = 'none';
            loginForm.reset();
            errorMessage.textContent = '';
            showToast('Login successful!', 'success');
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
        });
});

noticeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('noticeTitle').value;
    const category = document.getElementById('noticeCategory').value;
    const content = document.getElementById('noticeContent').value;
    
    postNotice(title, category, content);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        loadNotices();
    });
});

// Auth State Observer
auth.onAuthStateChanged((user) => {
    updateAuthUI(user);
});

// Initial Load
loadNotices();
