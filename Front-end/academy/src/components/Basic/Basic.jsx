import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import LatestNotices from '../notice/LatestNotices';
import LatestRefs from '../reference/LatestRefs';

const Basic = () => {
    const [showMainContent, setShowMainContent] = useState(true);

    return (
        <div className='d-flex flex-column justify-content-between mainBody vsc-initialized'>
            <Header setShowMainContent={setShowMainContent} />
            <div className="container">
                <div className="d-flex flex-column align-items-start">
                    {showMainContent && (
                        <>
                            <div className="mb-3">
                                <LatestNotices />
                            </div>
                            <div style={{ marginRight: '70px' }}>
                                <LatestRefs />
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Basic;
