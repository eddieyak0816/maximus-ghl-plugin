require('dotenv').config();
const pool = require('./connection');
const bcrypt = require('bcrypt');

async function seed() {
  const connection = await pool.getConnection();
  try {
    console.log('🌱 Seeding database...\n');

    // Clear existing data (for testing)
    await connection.query('DELETE FROM appointments');
    await connection.query('DELETE FROM team_member_blackouts');
    await connection.query('DELETE FROM team_member_schedules');
    await connection.query('DELETE FROM team_members');
    await connection.query('DELETE FROM hourly_slot_limits');
    await connection.query('DELETE FROM users');
    console.log('✓ Cleared existing data');

    // Add admin users
    const adminPassword = await bcrypt.hash('password123', 10);
    await connection.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      ['Eddie Admin', 'eddie@maximus.com', adminPassword, 'admin']
    );
    await connection.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      ['Manager', 'manager@maximus.com', adminPassword, 'admin']
    );
    console.log('✓ Added 2 admin users');

    // Add 4 team members
    const teamMembers = [
      { name: 'John Smith', email: 'john@maximus.com', phone: '+15551234501' },
      { name: 'Jane Doe', email: 'jane@maximus.com', phone: '+15551234502' },
      { name: 'Bob Johnson', email: 'bob@maximus.com', phone: '+15551234503' },
      { name: 'Sarah Williams', email: 'sarah@maximus.com', phone: '+15551234504' }
    ];

    for (const member of teamMembers) {
      await connection.query(
        'INSERT INTO team_members (name, email, phone, default_buffer_min) VALUES (?, ?, ?, ?)',
        [member.name, member.email, member.phone, 30]
      );
    }
    console.log('✓ Added 4 team members');

    // Add schedules (Mon-Fri 8am-6pm, Sat 9am-5pm)
    const schedules = [
      // John: Mon-Fri 8am-6pm, Sat 9am-5pm
      { team_member_id: 1, day: 1, start: '08:00:00', end: '18:00:00' },
      { team_member_id: 1, day: 2, start: '08:00:00', end: '18:00:00' },
      { team_member_id: 1, day: 3, start: '08:00:00', end: '18:00:00' },
      { team_member_id: 1, day: 4, start: '08:00:00', end: '18:00:00' },
      { team_member_id: 1, day: 5, start: '08:00:00', end: '18:00:00' },
      { team_member_id: 1, day: 6, start: '09:00:00', end: '17:00:00' },
      // Jane: Mon-Fri 8am-5pm, Sat off
      { team_member_id: 2, day: 1, start: '08:00:00', end: '17:00:00' },
      { team_member_id: 2, day: 2, start: '08:00:00', end: '17:00:00' },
      { team_member_id: 2, day: 3, start: '08:00:00', end: '17:00:00' },
      { team_member_id: 2, day: 4, start: '08:00:00', end: '17:00:00' },
      { team_member_id: 2, day: 5, start: '08:00:00', end: '17:00:00' },
      // Bob: Mon-Fri 10am-6pm, Sat off
      { team_member_id: 3, day: 1, start: '10:00:00', end: '18:00:00' },
      { team_member_id: 3, day: 2, start: '10:00:00', end: '18:00:00' },
      { team_member_id: 3, day: 3, start: '10:00:00', end: '18:00:00' },
      { team_member_id: 3, day: 4, start: '10:00:00', end: '18:00:00' },
      { team_member_id: 3, day: 5, start: '10:00:00', end: '18:00:00' },
      // Sarah: Mon-Wed, Fri-Sat 9am-5pm, Thu off
      { team_member_id: 4, day: 1, start: '09:00:00', end: '17:00:00' },
      { team_member_id: 4, day: 2, start: '09:00:00', end: '17:00:00' },
      { team_member_id: 4, day: 3, start: '09:00:00', end: '17:00:00' },
      { team_member_id: 4, day: 5, start: '09:00:00', end: '17:00:00' },
      { team_member_id: 4, day: 6, start: '09:00:00', end: '17:00:00' }
    ];

    for (const sched of schedules) {
      await connection.query(
        'INSERT INTO team_member_schedules (team_member_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)',
        [sched.team_member_id, sched.day, sched.start, sched.end]
      );
    }
    console.log('✓ Added team member schedules');

    // Add hourly slot limits (Mon-Fri: 2 slots 8-10am, 3 slots 10am-5pm, 1 slot 5-6pm)
    const slotLimits = [];
    for (let day = 1; day <= 5; day++) {
      for (let hour = 8; hour < 22; hour++) {
        let maxSlots = 0;
        if (hour >= 8 && hour < 10) maxSlots = 2;
        else if (hour >= 10 && hour < 17) maxSlots = 3;
        else if (hour >= 17 && hour < 18) maxSlots = 1;
        if (maxSlots > 0) slotLimits.push({ day, hour, maxSlots });
      }
    }
    // Saturday: 1-2 slots 9am-5pm
    for (let hour = 9; hour < 17; hour++) {
      slotLimits.push({ day: 6, hour, maxSlots: 2 });
    }

    for (const limit of slotLimits) {
      await connection.query(
        'INSERT INTO hourly_slot_limits (day_of_week, hour, max_slots) VALUES (?, ?, ?)',
        [limit.day, limit.hour, limit.maxSlots]
      );
    }
    console.log('✓ Added hourly slot limits');

    // Add sample appointment
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointmentStart = new Date(tomorrow);
    appointmentStart.setHours(9, 0, 0);
    const appointmentEnd = new Date(appointmentStart);
    appointmentEnd.setHours(10, 0, 0);

    await connection.query(
      'INSERT INTO appointments (team_member_id, customer_name, customer_email, customer_phone, start_datetime, end_datetime, status, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [1, 'Test Customer', 'test@customer.com', '+15559876543', appointmentStart, appointmentEnd, 'scheduled', 'plugin']
    );
    console.log('✓ Added sample appointment');

    // Initialize round robin state
    await connection.query(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
      ['round_robin_last_assigned', JSON.stringify({ team_member_id: 4 })]
    );
    console.log('✓ Initialized round robin state');

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample data:');
    console.log('  - Admin: eddie@maximus.com / password123');
    console.log('  - 4 team members (John, Jane, Bob, Sarah)');
    console.log('  - Schedules set (varied hours and days)');
    console.log('  - Hourly slot limits configured');
    console.log('  - 1 sample appointment for tomorrow at 9am');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    connection.release();
  }
}

seed();
