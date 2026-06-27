-- Users: Admin/staff logins
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'viewer') DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Team Members: The 4 people taking appointments
CREATE TABLE IF NOT EXISTS team_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  default_buffer_min INT DEFAULT 30,
  ghl_user_id VARCHAR(100) UNIQUE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_ghl_user_id (ghl_user_id),
  INDEX idx_active (active)
);

-- Team Member Schedules: Hours per day
CREATE TABLE IF NOT EXISTS team_member_schedules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_member_id INT NOT NULL,
  day_of_week TINYINT NOT NULL COMMENT '0=Sun, 1=Mon, ..., 6=Sat',
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_member_id) REFERENCES team_members(id) ON DELETE CASCADE,
  UNIQUE KEY unique_schedule (team_member_id, day_of_week),
  INDEX idx_team_member (team_member_id, day_of_week)
);

-- Team Member Blackouts: Blocked time (vacation, sick, etc)
CREATE TABLE IF NOT EXISTS team_member_blackouts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  team_member_id INT NOT NULL,
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL,
  note VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_member_id) REFERENCES team_members(id) ON DELETE CASCADE,
  INDEX idx_blackout (team_member_id, start_datetime)
);

-- Hourly Slot Limits: Max appointments per hour per day
CREATE TABLE IF NOT EXISTS hourly_slot_limits (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day_of_week TINYINT NOT NULL COMMENT '0=Sun, 1=Mon, ..., 6=Sat',
  hour TINYINT NOT NULL COMMENT '0-23',
  max_slots TINYINT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_limit (day_of_week, hour),
  INDEX idx_slot_limit (day_of_week, hour)
);

-- Appointments: Booked appointments
CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ghl_appt_id VARCHAR(100) UNIQUE,
  google_event_id VARCHAR(100) UNIQUE,
  team_member_id INT NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100),
  customer_phone VARCHAR(20),
  start_datetime DATETIME NOT NULL,
  end_datetime DATETIME NOT NULL,
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  source ENUM('plugin', 'ghl', 'chatbot') DEFAULT 'plugin',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (team_member_id) REFERENCES team_members(id) ON DELETE RESTRICT,
  INDEX idx_team_member (team_member_id),
  INDEX idx_datetime (start_datetime, status),
  INDEX idx_ghl_appt (ghl_appt_id),
  INDEX idx_google_event (google_event_id)
);

-- Settings: Key/value configuration store
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
