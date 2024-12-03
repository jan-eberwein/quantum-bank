const { db } = require('../db/connection');

exports.getTransactionsByAccount = (req, res) => {
    const accountId = parseInt(req.params.accountId, 10);
    if (isNaN(accountId)) {
        return res.status(400).json({ message: 'Invalid account ID' });
    }

    // Extract the authenticated user's ID from the request object
    const userId = req.user.userId; // Ensure this is set by your `authenticateToken` middleware

    // Query to check if the account belongs to the authenticated user
    db.get('SELECT * FROM Accounts WHERE account_id = ? AND owner_id = ?', [accountId, userId], (err, account) => {
        if (err) {
            console.error('Error checking account ownership:', err.message);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!account) {
            return res.status(403).json({ message: 'You are not authorized to access this account' });
        }

        // Proceed to fetch transactions if the user is the owner of the account
        const query = `
            SELECT 
                t.transaction_id,
                t.sender_account_id,
                t.recipient_account_id,
                t.amount,
                t.description,
                t.transaction_date,
                tc.category_name,
                ts.status_name
            FROM Transactions t
            LEFT JOIN Transaction_Categories tc ON t.category_id = tc.category_id
            LEFT JOIN Transaction_Statuses ts ON t.status_id = ts.status_id
            WHERE t.sender_account_id = ? OR t.recipient_account_id = ?
            ORDER BY t.transaction_date DESC
        `;

        db.all(query, [accountId, accountId], (err, rows) => {
            if (err) {
                console.error('Error fetching transactions:', err.message);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.json(rows);
        });
    });
};
