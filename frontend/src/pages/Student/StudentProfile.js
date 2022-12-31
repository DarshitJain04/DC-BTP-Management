/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer/Footer';

const StudentProfile = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {loading ? (
                <Loading />
            ) : (
                <div style={{
                    height: '100vh',
                    textAlign: 'center',
                    lineHeight: '100vh',
                }}>
                    Connect profile when linked to the ERP Database
                </div>
            )}
            <Footer />
        </div>
    );
};

export default StudentProfile;
