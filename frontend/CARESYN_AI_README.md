# CareSyn AI - Industrial Maintenance Automation System

A modern, responsive industrial AI-powered maintenance system built with Next.js, React, and Tailwind CSS.

## 🎨 Design Features

### Theme
- **Color Palette**: Clean cream/light beige aesthetic (#FAF8F5 background, #C8B896 accents)
- **Typography**: Clean, modern sans-serif fonts
- **Components**: Cards, timelines, and visual workflow pipeline
- **Animations**: Smooth hover effects, transitions, and loading states

### Layout
- **Sidebar Navigation**: Dark industrial theme (#2C2416) with active state indicators
- **Header**: Search functionality, notifications, and user profile
- **Responsive Grid**: Adapts to mobile, tablet, and desktop screens

## 🚀 Main Features

### 1. **Dashboard** (`/dashboard`)
- Real-time statistics cards (Active Devices, Critical Alerts, Resolved Today, Efficiency)
- Recent alerts panel with color-coded risk levels
- Device status grid with health scores
- Activity timeline with event history

### 2. **Workflow Automation Builder** (`/workflow`)
Visual pipeline with 4 connected stages:

#### Stage 1: Trigger (Risk Detection)
- Color-coded risk level selection (Low/Medium/High/Critical)
- Machine ID dropdown
- Real-time risk badge indicators

#### Stage 2: Call Engineer
- Engineer selection from dropdown list
- Engineer role display
- Call button with status (Calling/Connected/Failed)
- Simulated call functionality with 80% success rate

#### Stage 3: Send Report
- Auto-generated report type
- Send via options (SMS/Email/App Notification)
- Send button with success/failure feedback
- Status indicators

#### Stage 4: System Log / Audit Trail
- Scrollable timeline view
- Timestamp and event type tracking
- Color-coded status badges
- Detailed event messages
- Live activity indicator

### 3. **Devices** (`/devices`)
- Complete device inventory grid
- Real-time health monitoring
- Temperature, vibration, and runtime metrics
- Status indicators (Online/Warning/Critical/Offline)
- Device statistics dashboard

### 4. **Alerts** (`/alerts`)
- Filterable alert list (All/Active/Acknowledged/Resolved)
- Color-coded risk levels
- Engineer assignment tracking
- Alert acknowledgment and resolution actions
- Detailed alert information

### 5. **Logs** (`/logs`)
- Complete system audit trail
- Search and filter functionality
- Log level filtering (Success/Info/Warning/Error)
- Expandable detail views
- Export functionality
- Real-time log streaming

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📁 Project Structure

```
frontend/
├── app/
│   ├── (industrial)/          # Industrial layout group
│   │   ├── layout.tsx         # Shared layout with sidebar
│   │   ├── dashboard/         # Dashboard page
│   │   ├── workflow/          # Workflow builder
│   │   ├── devices/           # Device management
│   │   ├── alerts/            # Alert management
│   │   └── logs/              # System logs
│   ├── components/
│   │   ├── industrial/        # Industrial-specific components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── WorkflowBuilder.tsx
│   │   │   └── workflow/      # Workflow stage components
│   │   │       ├── TriggerStage.tsx
│   │   │       ├── CallEngineerStage.tsx
│   │   │       ├── SendReportStage.tsx
│   │   │       └── LogStage.tsx
│   │   └── ui/                # shadcn/ui components
│   └── global.css
```

## 🎯 Mock Data

The application includes comprehensive mock data for:
- **Engineers**: 5 engineers with roles (Senior Maintenance, Mechanical, Electrical, Systems, Field Technician)
- **Machines**: 6 industrial machines (Conveyor, Pump, Motor, Compressor, Turbine, Boiler)
- **Alerts**: Multi-level alerts with risk ratings
- **Logs**: System events with timestamps and details

## 🎨 Color System

### Background Colors
- `#FAF8F5` - Primary background (cream/light beige)
- `#2C2416` - Sidebar background (dark brown)
- `#FFFFFF` - Card backgrounds

### Accent Colors
- `#C8B896` - Primary accent (warm beige)
- `#A69776` - Secondary accent
- `#6B5E4F` - Text secondary
- `#2C2416` - Text primary

### Status Colors
- 🟢 Green (`#10b981`) - Success/Online/Low Risk
- 🟡 Yellow (`#eab308`) - Warning/Medium Risk
- 🟠 Orange (`#f97316`) - High Risk
- 🔴 Red (`#ef4444`) - Critical/Error
- ⚫ Gray (`#6b7280`) - Offline/Inactive

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Navigate to `http://localhost:3000`

## 🔧 State Management

The application uses React hooks for state management:
- `useState` for component-level state
- Props drilling for workflow state management
- Event callbacks for cross-component communication

## ✨ Key Features

### Workflow Execution
1. Configure trigger (risk level + machine)
2. Select engineer to call
3. Choose report delivery method
4. Execute workflow with animated transitions
5. Real-time log updates
6. Success/failure feedback

### Visual Pipeline
- Left-to-right flow with arrow connectors
- Active stage highlighting with scale animation
- Color-coded transitions based on status
- Smooth animations between stages

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar for mobile
- Stacked layouts on small screens

## 🎭 Animations

- **Hover effects**: Cards scale up, borders change color
- **Loading states**: Spinning indicators, pulse animations
- **Transitions**: Smooth color and transform transitions (300ms duration)
- **Stage activation**: Scale and shadow animations
- **Real-time updates**: Fade-in animations for new log entries

## 📱 Responsive Breakpoints

- Mobile: < 640px (single column, simplified views)
- Tablet: 640px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layouts)

## 🔐 Future Enhancements

- Backend API integration
- Real-time WebSocket updates
- User authentication
- Advanced filtering and sorting
- Data visualization charts
- PDF report generation
- Mobile app version

## 📝 License

This is a frontend demonstration project for CareSyn AI industrial maintenance system.

---

Built with ❤️ using Next.js, React, and Tailwind CSS
