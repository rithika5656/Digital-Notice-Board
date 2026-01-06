# Digital Notice Board 📋

A modern digital notice board application that replaces traditional physical notice boards. Admins can post notices and students get instant updates in real-time.

![Digital Notice Board](https://img.shields.io/badge/Status-Active-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)

## 🚀 Features

- **Real-time Updates**: Notices appear instantly for all users when posted
- **Admin Authentication**: Secure login for administrators to post/delete notices
- **Category Filtering**: Filter notices by category (General, Examination, Event, Urgent)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations
## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Hosting**: Can be hosted on Firebase Hosting, GitHub Pages, or any static host

## 📦 Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" and follow the setup wizard
3. Once created, click on "Web" to add a web app to your project

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Go to **Users** tab and add an admin user with email and password

### 3. Setup Realtime Database

1. In Firebase Console, go to **Realtime Database**
2. Click "Create Database"
3. Start in **test mode** for development (remember to add security rules for production)
4. Copy your database URL

### 4. Configure the App

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your Firebase project configuration:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 5. Database Security Rules (Production)

For production, update your Realtime Database rules:

```json
{
  "rules": {
    "notices": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## 🖥️ Running Locally

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

## 📱 Usage

### For Students
- View all posted notices on the main page
- Filter notices by category using the filter buttons
- Notices update in real-time

### For Admins
1. Click "Admin Login" button
2. Enter your admin credentials
3. Use the "Post New Notice" form to add notices
4. Delete notices using the delete button on each notice card

## 📁 Project Structure

```
Digital-Notice-Board/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   ├── firebase-config.js  # Firebase configuration
│   └── app.js          # Main application logic
└── README.md           # Documentation
```

## 🎨 Notice Categories

| Category | Color | Use Case |
|----------|-------|----------|
| General | Blue | General announcements |
| Examination | Orange | Exam schedules, results |
| Event | Green | Events, workshops, seminars |
| Urgent | Red | Important urgent notices |

## 🔒 Security Considerations

- Always use HTTPS in production
- Implement proper Firebase security rules
- Never expose sensitive credentials in client-side code
- Regularly rotate admin passwords

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rithika**

---

⭐ Star this repository if you found it helpful!
