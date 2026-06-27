const db = require('../db/setup');

// Get the current round robin index
function getLastAssignedIndex(callback) {
  db.get(
    "SELECT value FROM settings WHERE key = 'round_robin_last_assigned_index'",
    (err, row) => {
      if (err) {
        console.error('DB error:', err);
        callback(null, 0);
      } else {
        callback(null, parseInt(row?.value || 0));
      }
    }
  );
}

// Update the round robin index
function setLastAssignedIndex(index, callback) {
  db.run(
    "UPDATE settings SET value = ? WHERE key = 'round_robin_last_assigned_index'",
    [index.toString()],
    callback
  );
}

// Pick the next person in rotation
function getNextAssignee(availableMembers, callback) {
  if (!availableMembers || availableMembers.length === 0) {
    callback(new Error('No available team members'), null);
    return;
  }

  getLastAssignedIndex((err, lastIndex) => {
    const nextIndex = (lastIndex + 1) % availableMembers.length;
    const nextMember = availableMembers[nextIndex];

    setLastAssignedIndex(nextIndex, (err) => {
      if (err) {
        console.error('Failed to update round robin state:', err);
      }
      callback(null, { member: nextMember, index: nextIndex });
    });
  });
}

module.exports = { getLastAssignedIndex, setLastAssignedIndex, getNextAssignee };
