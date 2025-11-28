# 🏊‍♂️ Movesbook - Advanced Workout Management Platform

## Project Overview
A comprehensive full-stack web application for athletes, coaches, clubs, and teams to manage training programs, track performance, and collaborate on workout planning.

**Live Demo:** http://217.154.202.41:3000  
**Tech Stack:** Next.js 14, React, TypeScript, Prisma, MySQL, Tailwind CSS  
**Role:** Full-Stack Developer  
**Timeline:** [Your timeline here]

---

## 🎯 Key Features Implemented

### 1. **Multi-Language System (12 Languages)**
- Dynamic translation management with admin interface
- Support for: English, French, Italian, German, Spanish, Portuguese, Russian, Hindi, Japanese, Indonesian, Chinese, Arabic
- Real-time translation via MyMemory API
- 5,400+ translations across the platform
- Category-based organization (System, Social, Management)

### 2. **Advanced Admin Dashboard**
- User management (1,600+ users)
- Translation editor with search, filter, and bulk operations
- Soft-delete and restore functionality with Super Admin authentication
- Real-time preview of changes
- Export/Import capabilities

### 3. **Workout Planning System**
- Hierarchical structure: Period → Day → Session → Moveframe → Movelap → Microlap
- Drag-and-drop reordering
- Template creation and sharing
- Multi-sport support
- Progress tracking and statistics

### 4. **Customizable UI**
- Theme switching (Light/Dark/Auto)
- Custom color schemes with live preview
- Adjustable layouts and display modes
- Saved preferences per user
- Responsive design for all devices

### 5. **Role-Based Access Control**
- Athletes: Track personal workouts
- Coaches: Assign workouts, manage athletes
- Clubs: Member management, group training
- Teams: Collaborative planning
- Admins: Platform-wide configuration

### 6. **Database Architecture**
- Prisma ORM with MySQL
- 440 tables managing complex relationships
- Efficient query optimization
- Migration from legacy system (SQLite → MySQL)
- Data integrity with foreign key constraints

---

## 💻 Technical Highlights

### **Frontend**
- **Next.js 14** (App Router)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Context** for state management
- **Server Components** for performance

### **Backend**
- **Next.js API Routes**
- **Prisma ORM** for database access
- **JWT Authentication**
- **bcrypt** for password hashing
- **Raw SQL** for complex queries

### **DevOps**
- **PM2** process management
- **Ubuntu Server** deployment
- **Git** version control
- **XAMPP** for local development

---

## 🎨 UI/UX Features

### **Color Customization**
- 20+ customizable color properties
- Contrast ratio validation
- Save/Export/Import color schemes
- Real-time preview

### **Internationalization**
- RTL support for Arabic
- Date/time localization
- Number formatting
- Currency handling

### **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Keyboard shortcuts

---

## 🚀 Performance Optimizations

- **Static Site Generation** for 92 pages
- **Dynamic imports** for code splitting
- **Image optimization** with Next.js Image
- **Database query optimization**
- **Caching strategies**
- **Lazy loading** for components

---

## 📊 Project Statistics

- **Lines of Code:** 50,000+
- **React Components:** 150+
- **API Endpoints:** 70+
- **Database Tables:** 440
- **Supported Languages:** 12
- **User Base:** 1,600+ migrated users
- **Build Size:** 87.3 KB (shared JS)

---

## 🛠️ Development Process

### **Phase 1: Planning & Architecture**
- Database schema design
- API structure planning
- Component hierarchy mapping

### **Phase 2: Core Features**
- Authentication system
- User management
- Basic CRUD operations

### **Phase 3: Advanced Features**
- Workout planning system
- Translation management
- Customization options

### **Phase 4: Migration & Deployment**
- Legacy data migration (416 translation tables)
- User credential migration
- Production server setup
- Performance optimization

---

## 🎯 Challenges Overcome

### **1. Large-Scale Data Migration**
- **Challenge:** Migrate 440 tables from legacy system
- **Solution:** Created custom migration scripts, handled encoding issues (UTF-16 → UTF-8), managed foreign key constraints

### **2. Multi-Language Architecture**
- **Challenge:** Support 12 languages with RTL
- **Solution:** Built flexible translation system with category-based organization and real-time API integration

### **3. Complex UI Customization**
- **Challenge:** Allow extensive customization without breaking UX
- **Solution:** Implemented live preview, validation, and preset management

### **4. Authentication with Legacy System**
- **Challenge:** Support both SHA1 (legacy) and bcrypt passwords
- **Solution:** Hybrid authentication with automatic migration on login

---

## 📱 Screenshots

### Admin Dashboard
![Admin Dashboard](./public/images/dashboard.png)

### Workout Planning
*Advanced hierarchical workout structure with drag-and-drop*

### Language Management
*12-language support with translation editor*

### Color Customization
*Live preview with 20+ customizable properties*

---

## 🔗 Links

- **Live Demo:** http://217.154.202.41:3000
- **GitHub:** [Your GitHub repo]
- **Documentation:** [Link to docs]

---

## 💡 Key Learnings

1. **Large-scale database migrations** require careful planning and error handling
2. **Internationalization** should be built in from the start
3. **User authentication** needs backward compatibility in legacy system migrations
4. **Performance optimization** is crucial for complex applications
5. **Type safety** (TypeScript) prevents bugs in large codebases

---

## 🎓 Skills Demonstrated

- ✅ Full-stack development (Next.js, React, Node.js)
- ✅ Database design and optimization (Prisma, MySQL)
- ✅ API development and integration
- ✅ Authentication and security
- ✅ Internationalization (i18n)
- ✅ UI/UX design and customization
- ✅ DevOps and deployment (PM2, Ubuntu)
- ✅ Git version control
- ✅ Problem-solving and debugging
- ✅ Code architecture and maintainability

---

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time collaboration (WebSockets)
- [ ] AI-powered workout suggestions
- [ ] Integration with fitness trackers
- [ ] Social features (comments, likes, sharing)
- [ ] Video upload and analysis
- [ ] Nutrition planning module

---

## 📞 Contact

**[Your Name]**  
Email: [your.email@example.com]  
LinkedIn: [Your LinkedIn]  
GitHub: [Your GitHub]  
Portfolio: [Your Portfolio URL]

---

*This project demonstrates proficiency in modern web development, database management, and deployment practices suitable for production environments.*

