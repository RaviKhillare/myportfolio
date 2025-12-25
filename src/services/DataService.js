const DB_KEY = 'portfolio_db_v1';

const initialData = {
    profile: {
        name: "Ravindra Khillare",
        title: "Computer Teacher & Tech Enthusiast",
        location: "Phulambri, Chhatrapati Sambhaji Nagar",
        bio: "I am a passionate educator and technologist with expertise in software, hardware, robotoics, and coding. I focus on creating digital assets for kids education.",
        social: {
            email: "contact@example.com",
            phone: "+91 1234567890"
        },
        image: "https://placehold.co/400x400?text=RK"
    },
    services: [
        { id: 1, title: "Software & Hardware", description: "Comprehensive solutions and troubleshooting.", icon: "Cpu" },
        { id: 2, title: "Teaching & Coding", description: "Expert guidance in programming and computer science.", icon: "Code" },
        { id: 3, title: "Robotics", description: "Hands-on robotics training and workshop.", icon: "Bot" },
        { id: 4, title: "Digital Education", description: "Creating engaging online games, videos, and ebooks for kids.", icon: "BookOpen" }
    ],
    slider: [
        { id: 1, text: "Empowering Students with Digital Skills", active: true },
        { id: 2, text: "Innovative Solutions for Modern Education", active: true },
        { id: 3, text: "Building the Future with Robotics & Code", active: true }
    ],
    ads: [
        {
            id: 1,
            title: "Local Book Store",
            content: "Get 20% off on all coding books!",
            startDate: "2024-01-01",
            endDate: "2025-12-31",
            active: true
        }
    ],
    messages: []
};

// Initialize DB if not exists
if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
}

export const DataService = {
    get: () => {
        return JSON.parse(localStorage.getItem(DB_KEY));
    },
    update: (section, data) => {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        db[section] = data;
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return db;
    },
    // Specific helper for messages since it's append-only usually
    addMessage: (msg) => {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        const newMsg = { id: Date.now(), ...msg, date: new Date().toISOString() };
        db.messages.push(newMsg);
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return newMsg;
    },
    reset: () => {
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    }
};
