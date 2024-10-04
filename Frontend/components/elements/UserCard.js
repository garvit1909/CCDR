import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: 'calc(33.333% - 16px)', // Adjust width as needed
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        }}>
            <h5 style={{ marginTop: '0', marginBottom: '8px', fontSize: '1.2rem' }}>
                {user.fullname || 'No name available'}
            </h5>
            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                <strong>Email:</strong> {user.email || 'N/A'}
            </p>
            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                <strong>Alternate Email:</strong> {user.alternateEmail || 'N/A'}
            </p>
            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                <strong>Department:</strong> {user.department || 'N/A'}
            </p>
            <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                <strong>Roll No:</strong> {user.rollNo || 'N/A'}
            </p>
        </div>
    );
};

export default UserCard;
